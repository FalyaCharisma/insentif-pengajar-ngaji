<?php

namespace App\Http\Controllers;

use App\Models\PengajuanProposal;
use App\Models\Periode;
use App\Models\Siswa;
use App\Models\Kuota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengajuanProposalController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', PengajuanProposal::class);

        $user = auth()->user();

        $query = PengajuanProposal::with(['lembaga', 'periode']);

        /*
        |--------------------------------------------------------------------------
        | Filter berdasarkan role
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('lembaga')) {
            $query->where('lembaga_id', $user->lembaga->id);
        } elseif ($user->hasRole('forum')) {
            $query->whereHas('lembaga', function ($q) use ($user) {
                $q->where('forum_id', $user->forum->id);
            });
        }
        // superadmin & dindik melihat semua

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->whereHas('lembaga', function ($q2) use ($search) {
                    $q2->where('nama', 'like', "%{$search}%");
                });

                $q->orWhereHas('periode', function ($q2) use ($search) {
                    $q2->where('tahun', 'like', "%{$search}%");
                });

                $q->orWhere('status', 'like', "%{$search}%");
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */

        $allowedSorts = ['id', 'status', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $pengajuanProposal = $query->paginate($perPage)->withQueryString();

        /*
        |--------------------------------------------------------------------------
        | Data lembaga login
        |--------------------------------------------------------------------------
        */

        $lembaga = $user->lembaga;

        $periode = Periode::where('status', true)->first();

        $canCreateProposal = false;

        if ($periode) {
            $today = now()->toDateString();

            $canCreateProposal = $today >= $periode->mulai_upload && $today <= $periode->selesai_upload;
        }

        $jumlahSiswa = 0;
        $estimasiKuota = 0;

        if ($lembaga && $periode) {
            $siswa = Siswa::where('lembaga_id', $lembaga->id)->where('periode_id', $periode->id)->first();

            if ($siswa) {
                $jumlahSiswa = $siswa->jumlah_siswa;
            }

            $kuota = Kuota::where('lembaga_id', $lembaga->id)->where('periode_id', $periode->id)->first();

            if ($kuota) {
                $estimasiKuota = $kuota->estimasi_kuota;
            }
        }

        return Inertia::render('pengajuan-proposal/index', [
            'pengajuanProposal' => $pengajuanProposal,
            'periode' => $periode,
            'canCreateProposal' => $canCreateProposal,
            'jumlahSiswa' => $jumlahSiswa,
            'estimasiKuota' => $estimasiKuota,
            'lembaga' => $lembaga,
            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', PengajuanProposal::class);

        $periode = Periode::where('status', true)->first();

        abort_unless($periode && now()->between($periode->mulai_upload, $periode->selesai_upload), 403, 'Periode pengajuan proposal telah berakhir atau belum dibuka.');

        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'jumlah_guru' => 'required|integer|min:1',
            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:2048'],
        ]);

        $lembaga = auth()->user()->lembaga;

        $kuota = Kuota::where('lembaga_id', $lembaga->id)->where('periode_id', $validated['periode_id'])->first();

        if (!$kuota) {
            return back()->withErrors([
                'jumlah_guru' => 'Kuota lembaga belum tersedia.',
            ]);
        }

        if ($validated['jumlah_guru'] > $kuota->estimasi_kuota) {
            return back()->withErrors([
                'jumlah_guru' => "Jumlah guru yang diajukan tidak boleh melebihi estimasi kuota ({$kuota->estimasi_kuota}).",
            ]);
        }

        // Cek apakah sudah pernah mengajukan proposal pada periode yang sama
        $exists = PengajuanProposal::where('lembaga_id', $lembaga->id)->where('periode_id', $validated['periode_id'])->exists();

        if ($exists) {
            return back()->withErrors([
                'periode_id' => 'Proposal untuk periode ini sudah pernah diajukan.',
            ]);
        }

        $validated['lembaga_id'] = $lembaga->id;

        if ($request->hasFile('bukti_dukung')) {
            $file = $request->file('bukti_dukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('files/proposal', $filename, 'public');

            $validated['bukti_dukung'] = $filename;
        }

        $validated['status'] = 'pending';
        $validated['catatan'] = null;

        PengajuanProposal::create($validated);

        return back()->with('success', 'Pengajuan proposal berhasil ditambahkan.');
    }

    public function update(Request $request, PengajuanProposal $pengajuanProposal)
    {
        $this->authorize('update', $pengajuanProposal);

        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'jumlah_guru' => ['required', 'integer', 'min:1'],
            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:2048'],
        ]);

        $lembaga = auth()->user()->lembaga;

        $kuota = Kuota::where('lembaga_id', $lembaga->id)->where('periode_id', $validated['periode_id'])->first();

        if (!$kuota) {
            return back()->withErrors([
                'jumlah_guru' => 'Kuota lembaga belum tersedia.',
            ]);
        }

        if ($validated['jumlah_guru'] > $kuota->estimasi_kuota) {
            return back()->withErrors([
                'jumlah_guru' => "Jumlah guru yang diajukan tidak boleh melebihi estimasi kuota ({$kuota->estimasi_kuota}).",
            ]);
        }

        // Pastikan tidak ada proposal lain pada periode yang sama
        $exists = PengajuanProposal::where('lembaga_id', $lembaga->id)->where('periode_id', $validated['periode_id'])->where('id', '!=', $pengajuanProposal->id)->exists();

        if ($exists) {
            return back()->withErrors([
                'periode_id' => 'Proposal untuk periode ini sudah pernah diajukan.',
            ]);
        }

        // Upload file baru jika ada
        if ($request->hasFile('bukti_dukung')) {
            $file = $request->file('bukti_dukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            // Simpan file baru
            $file->storeAs('files/proposal', $filename, 'public');

            // Hapus file lama setelah file baru berhasil disimpan
            if ($pengajuanProposal->bukti_dukung && Storage::disk('public')->exists('files/proposal/' . $pengajuanProposal->bukti_dukung)) {
                Storage::disk('public')->delete('files/proposal/' . $pengajuanProposal->bukti_dukung);
            }

            $validated['bukti_dukung'] = $filename;
        } else {
            // Tetap gunakan file lama jika tidak upload file baru
            $validated['bukti_dukung'] = $pengajuanProposal->bukti_dukung;
        }

        $validated['lembaga_id'] = $lembaga->id;
        $validated['status'] = 'pending';
        $validated['catatan'] = null;

        $pengajuanProposal->update($validated);

        return back()->with('success', 'Pengajuan proposal berhasil diperbarui.');
    }

    public function destroy(PengajuanProposal $pengajuanProposal)
    {
        $this->authorize('delete', $pengajuanProposal);

        if ($pengajuanProposal->status === 'verified') {
            return back()->withErrors([
                'proposal' => 'Proposal yang sudah diverifikasi tidak dapat dihapus.',
            ]);
        }

        if ($pengajuanProposal->bukti_dukung && Storage::disk('public')->exists('files/proposal/' . $pengajuanProposal->bukti_dukung)) {
            Storage::disk('public')->delete('files/proposal/' . $pengajuanProposal->bukti_dukung);
        }

        $pengajuanProposal->delete();

        return back()->with('success', 'Pengajuan proposal berhasil dihapus.');
    }

    public function verify(PengajuanProposal $pengajuanProposal)
    {
        $this->authorize('verify', $pengajuanProposal);

        $pengajuanProposal->update([
            'status' => 'verified',
            'catatan' => null,
        ]);

        return back()->with('success', 'Proposal berhasil diverifikasi.');
    }

    public function unverify(Request $request, PengajuanProposal $pengajuanProposal)
    {
        $this->authorize('verify', $pengajuanProposal);

        $validated = $request->validate([
            'catatan' => ['required', 'string', 'max:1000'],
        ]);

        $pengajuanProposal->update([
            'status' => 'revision',
            'catatan' => $validated['catatan'],
        ]);

        return back()->with('success', 'Proposal dikembalikan untuk diperbaiki.');
    }
}
