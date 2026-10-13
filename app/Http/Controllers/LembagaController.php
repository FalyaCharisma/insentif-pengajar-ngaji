<?php

namespace App\Http\Controllers;
use App\Models\Lembaga;
use App\Models\Forum;
use App\Models\KategoriLembaga;
use App\Models\ProfilLembaga;
use App\Models\JenisDokumen;
use App\Models\DokumenLembaga;
use App\Models\User;
use App\Imports\LembagaImport;
use App\Exports\LembagaImportTemplateExport;
use App\Exports\LembagaAccountsExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;

class LembagaController extends Controller
{
    public function export(Request $request)
    {
        abort_unless($request->user()->hasAnyRole(['superadmin', 'dindik']), 403);

        $validated = $request->validate([
            'forum_id' => ['nullable', 'integer', 'exists:forum,id'],
        ]);

        $query = Lembaga::with(['forum', 'user']);

        if (!empty($validated['forum_id'])) {
            $query->where('forum_id', $validated['forum_id']);
        }

        if ($request->filled('search')) {
            $query->where(function ($builder) use ($request) {
                $builder->where('nama', 'like', '%'.$request->search.'%')
                    ->orWhere('kode', 'like', '%'.$request->search.'%');
            });
        }

        foreach (['kategori_id', 'status'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        foreach (['status_verifikasi', 'kecamatan', 'kelurahan'] as $filter) {
            if ($request->filled($filter)) {
                $column = match ($filter) {
                    'status_verifikasi' => 'status_verifikasi',
                    'kecamatan' => 'kode_kecamatan',
                    'kelurahan' => 'kode_kelurahan',
                };

                $query->whereHas('profil', fn ($profile) =>
                    $profile->where($column, $request->input($filter))
                );
            }
        }

        $lembaga = $query->orderBy('nama')->get();

        return Excel::download(new LembagaAccountsExport($lembaga), 'akun_lembaga.xlsx');
    }

    public function data(Request $request)
    {
        $query = Lembaga::query();

        if ($request->q) {
            $query->where('nama', 'like', '%' . $request->q . '%');
        }

        return response()->json([
            'data' => $query->limit(20)->get(),
        ]);
    }

    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Lembaga::with(['kategori', 'forum.kategori', 'user', 'profil']);

        // Forum hanya melihat lembaga yang dikelolanya
        if ($user->hasRole('forum')) {
            $query->where('forum_id', $user->forum->id);
        }

        if ($request->filled('status_verifikasi')) {
            $query->whereHas('profil', function ($q) use ($request) {
                $q->where('status_verifikasi', $request->status_verifikasi);
            });
        }

        if ($request->filled('kecamatan')) {
            $query->whereHas('profil', function ($q) use ($request) {
                $q->where('kode_kecamatan', $request->kecamatan);
            });
        }

        if ($request->filled('kelurahan')) {
            $query->whereHas('profil', function ($q) use ($request) {
                $q->where('kode_kelurahan', $request->kelurahan);
            });
        }

        $lembaga = $this->datatable(query: $query, request: $request, searchable: ['nama', 'kode'], sortable: ['id', 'nama'], filters: ['kategori_id', 'forum_id', 'status']);

        return Inertia::render('lembaga/index', [
            'lembaga' => $lembaga,

            'filters' => $this->filters($request, ['kategori_id', 'forum_id', 'status', 'status_verifikasi', 'kecamatan', 'kelurahan']),

            'kategori' => KategoriLembaga::orderBy('nama')->get(),
            'forum' => Forum::with('kategori')->where('status', 'aktif')->orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'forum_id' => ['required', 'exists:forum,id'],

            'nama' => ['required', 'string', 'max:255'],
        ]);

        DB::transaction(function () use ($validated) {
            $forum = Forum::findOrFail($validated['forum_id']);
            $this->createLembagaWithAccount($forum, $validated['nama']);
        });

        return back()->with('success', 'Data lembaga berhasil ditambahkan');
    }

    public function import(Request $request)
    {
        abort_unless($request->user()->hasAnyRole(['superadmin', 'dindik']), 403);

        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv', 'max:10240'],
        ]);

        $import = new LembagaImport();
        Excel::import($import, $validated['file']);

        $forums = Forum::with('kategori')
            ->where('status', 'aktif')
            ->get()
            ->keyBy(fn (Forum $forum) => mb_strtolower(trim($forum->nama)));
        $existingNames = Lembaga::query()
            ->whereIn('forum_id', $forums->pluck('id'))
            ->get(['forum_id', 'nama'])
            ->mapWithKeys(fn (Lembaga $lembaga) => [
                $lembaga->forum_id . ':' . mb_strtolower(trim($lembaga->nama)) => true,
            ]);

        $records = [];
        $seenNames = [];

        foreach ($import->rows() as $index => $row) {
            $forumName = trim((string) ($row['nama_forum'] ?? ''));
            $lembagaName = trim((string) ($row['nama_lembaga'] ?? ''));
            $rowNumber = $index + 2;

            if ($forumName === '' && $lembagaName === '') {
                continue;
            }

            if ($forumName === '' || $lembagaName === '') {
                throw ValidationException::withMessages([
                    'file' => "Baris {$rowNumber}: nama forum dan nama lembaga wajib diisi.",
                ]);
            }

            if (mb_strlen($forumName) > 255 || mb_strlen($lembagaName) > 255) {
                throw ValidationException::withMessages([
                    'file' => "Baris {$rowNumber}: nama forum dan lembaga maksimal 255 karakter.",
                ]);
            }

            $forum = $forums->get(mb_strtolower($forumName));

            if (! $forum) {
                throw ValidationException::withMessages([
                    'file' => "Baris {$rowNumber}: forum \"{$forumName}\" tidak ditemukan atau tidak aktif.",
                ]);
            }

            $nameKey = $forum->id . ':' . mb_strtolower($lembagaName);

            if (isset($existingNames[$nameKey]) || isset($seenNames[$nameKey])) {
                throw ValidationException::withMessages([
                    'file' => "Baris {$rowNumber}: lembaga \"{$lembagaName}\" sudah terdaftar pada forum tersebut.",
                ]);
            }

            $seenNames[$nameKey] = true;
            $records[] = ['forum' => $forum, 'nama' => $lembagaName];
        }

        if ($records === []) {
            throw ValidationException::withMessages([
                'file' => 'File tidak berisi data. Gunakan kolom nama forum dan nama lembaga.',
            ]);
        }

        DB::transaction(function () use ($records) {
            foreach ($records as $record) {
                $this->createLembagaWithAccount($record['forum'], $record['nama']);
            }
        });

        return back()->with('success', count($records) . ' lembaga berhasil diimpor beserta akun otomatis.');
    }

    public function downloadImportTemplate(Request $request)
    {
        abort_unless($request->user()->hasAnyRole(['superadmin', 'dindik']), 403);

        return Excel::download(new LembagaImportTemplateExport(), 'template_import_lembaga.xlsx');
    }

    private function createLembagaWithAccount(Forum $forum, string $nama): Lembaga
    {
        $kode = Lembaga::generateKode();
        $user = User::create([
            'name' => $nama,
            'email' => strtolower($kode) . '@mail.com',
            'password' => Hash::make($kode . '@kdr'),
            'force_change_password' => true,
            'status' => 'aktif',
        ]);
        $user->assignRole('lembaga');

        $lembaga = Lembaga::create([
            'user_id' => $user->id,
            'kategori_id' => $forum->kategori_id,
            'forum_id' => $forum->id,
            'kode' => $kode,
            'nama' => $nama,
        ]);

        ProfilLembaga::create([
            'lembaga_id' => $lembaga->id,
            'status_verifikasi' => 'pending',
        ]);

        return $lembaga;
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'forum_id' => ['required', 'exists:forum,id'],

            'nama' => ['required', 'string', 'max:255'],

            'status' => ['required', 'in:aktif,nonaktif'],
        ]);

        DB::transaction(function () use ($validated, $lembaga) {
            // Ambil forum
            $forum = Forum::findOrFail($validated['forum_id']);

            // Update data lembaga
            $lembaga->update([
                'forum_id' => $forum->id,

                // Kategori otomatis mengikuti forum
                'kategori_id' => $forum->kategori_id,

                'nama' => $validated['nama'],
            ]);

            // Update user
            $lembaga->user()->update([
                'name' => $validated['nama'],
                'status' => $validated['status'],
            ]);
        });

        return back()->with('success', 'Data lembaga berhasil diperbarui');
    }

    public function destroy(Lembaga $lembaga)
    {
        if ($lembaga->user) {
            $lembaga->user->update([
                'status' => 'nonaktif',
            ]);
        }

        $lembaga->delete();

        return back()->with('success', 'Data lembaga berhasil dihapus dan akun dinonaktifkan.');
    }

    public function resetPassword(Lembaga $lembaga)
    {
        $lembaga->load('user');

        $lembaga->user->update([
            'password' => Hash::make($lembaga->kode . '@kdr'),
            'force_change_password' => true,
        ]);

        return back()->with('success', 'Password berhasil direset.');
    }
}
