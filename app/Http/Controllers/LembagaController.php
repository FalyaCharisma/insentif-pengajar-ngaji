<?php

namespace App\Http\Controllers;
use App\Models\Lembaga;
use App\Models\Forum;
use App\Models\KategoriLembaga;
use App\Models\ProfilLembaga;
use App\Models\JenisDokumen;
use App\Models\DokumenLembaga;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class LembagaController extends Controller
{
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
            // Ambil forum
            $forum = Forum::findOrFail($validated['forum_id']);

            // Generate kode lembaga
            $kode = Lembaga::generateKode();

            // Buat user
            $user = User::create([
                'name' => $validated['nama'],
                'email' => strtolower($kode) . '@mail.com',
                'password' => Hash::make($kode . '@kdr'),
                'force_change_password' => true,
                'status' => 'aktif',
            ]);

            // Assign role
            $user->assignRole('lembaga');

            // Simpan lembaga
            $lembaga = Lembaga::create([
                'user_id' => $user->id,

                // Otomatis mengikuti kategori forum
                'kategori_id' => $forum->kategori_id,

                'forum_id' => $forum->id,
                'kode' => $kode,
                'nama' => $validated['nama'],
            ]);

            // Buat profil awal
            ProfilLembaga::create([
                'lembaga_id' => $lembaga->id,
                'status_verifikasi' => 'pending',
            ]);
        });

        return back()->with('success', 'Data lembaga berhasil ditambahkan');
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
