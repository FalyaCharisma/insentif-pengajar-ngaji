<?php

namespace App\Http\Controllers;

use App\Models\JadwalKegiatan;
use App\Models\LaporanKegiatan;
use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LaporanKegiatanController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        // Periode
        $periode = Periode::orderByDesc('tahun')->get();

        $periodeId = $request->periode_id
            ?? Periode::where('status', true)
                ->orderByDesc('tahun')
                ->value('id');

        // Laporan Kegiatan
        $query = LaporanKegiatan::with([
            'lembaga.profil',
            'periode',
        ]);

        if ($periodeId) {
            $query->where('periode_id', $periodeId);
        }

        // Lembaga hanya melihat laporan miliknya
        if ($user->hasRole('lembaga')) {
            $query->where(
                'lembaga_id',
                $user->lembaga->id
            );
        }

        $laporanKegiatan = $query
            ->latest('tanggal_mulai')
            ->paginate(10)
            ->withQueryString();

        // Rekap
        $rekapQuery = LaporanKegiatan::query();

        if ($periodeId) {
            $rekapQuery->where('periode_id', $periodeId);
        }

        if ($user->hasRole('lembaga')) {
            $rekapQuery->where(
                'lembaga_id',
                $user->lembaga->id
            );
        }

        $rekap = [
            'total' => (clone $rekapQuery)->count(),

            'verified' => (clone $rekapQuery)
                ->where('status', 'verified')
                ->count(),

            'pending' => (clone $rekapQuery)
                ->where('status', 'pending')
                ->count(),

            'revision' => (clone $rekapQuery)
                ->where('status', 'revision')
                ->count(),

            'rejected' => (clone $rekapQuery)
                ->where('status', 'rejected')
                ->count(),
        ];

        // Jadwal
        $jadwal = null;

        if (
            $user->hasRole('lembaga')
            && $user->lembaga
            && $periodeId
        ) {
            $jadwal = JadwalKegiatan::where(
                'lembaga_id',
                $user->lembaga->id
            )
                ->where('periode_id', $periodeId)
                ->first();
        }

        return Inertia::render('laporan-kegiatan/index', [
            'laporanKegiatan' => $laporanKegiatan,
            'periode' => $periode,
            'selectedPeriode' => $periodeId,
            'rekap' => $rekap,
            'jadwal' => $jadwal,
            'filters' => [
                'periode_id' => $periodeId,
            ],
        ]);
    }

    public function uploadJadwal(Request $request)
    {
        $user = auth()->user();

        // Hanya lembaga yang boleh upload
        if (!$user->hasRole('lembaga')) {
            abort(403, 'Anda tidak memiliki akses untuk mengupload jadwal.');
        }

        if (in_array($laporanKegiatan->status, ['verified', 'rejected'])) {
            return back()->with(
                'error',
                'Laporan dengan status tersebut tidak dapat diubah.'
            );
        }

        $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'file_jadwal' => ['required', 'file', 'mimes:pdf', 'max:2048'],
        ]);

        $lembaga = $user->lembaga;

        if (!$lembaga) {
            abort(403, 'Data lembaga tidak ditemukan.');
        }

        $periode = Periode::findOrFail($request->periode_id);

        // Cek Jadwal Periode Tersebut
        $jadwal = JadwalKegiatan::where('lembaga_id', $lembaga->id)
            ->where('periode_id', $periode->id)
            ->first();
        
        $file = $request->file('file_jadwal');

        $namaFile = 'jadwal_' . $lembaga->kode . '_' . $periode->tahun . '_' . time() . '.pdf';

        $path = $file->storeAs(
            'laporan-kegiatan/jadwal',
            $namaFile,
            'public'
        );

        if ($jadwal) {

            // Hapus file lama
            if (
                $jadwal->file_jadwal &&
                \Storage::disk('public')->exists($jadwal->file_jadwal)
            ) {
                \Storage::disk('public')->delete(
                    $jadwal->file_jadwal
                );
            }

            $jadwal->update([
                'file_jadwal' => $path,
            ]);

            return back()->with(
                'success',
                'Jadwal kegiatan berhasil diperbarui.'
            );
        }

        // Jadwal Baru
        JadwalKegiatan::create([
            'lembaga_id' => $lembaga->id,
            'periode_id' => $periode->id,
            'file_jadwal' => $path,
        ]);

        return back()->with(
            'success',
            'Jadwal kegiatan berhasil diupload.'
        );
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        // Hanya lembaga yang dapat menambahkan laporan kegiatan
        if (!$user->hasRole('lembaga')) {
            abort(403, 'Anda tidak memiliki akses untuk menambahkan laporan kegiatan.');
        }

        $lembaga = $user->lembaga;

        if (!$lembaga) {
            abort(403, 'Data lembaga tidak ditemukan.');
        }

        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'nama_kegiatan' => ['required', 'string', 'max:255'],
            'tanggal_mulai' => ['required', 'date'],
            'tanggal_selesai' => ['required', 'date', 'after_or_equal:tanggal_mulai'],
            'keterangan' => ['nullable','string'],
            'file_bukti' => ['nullable','file','mimes:pdf,jpg,jpeg,png','max:2048'],
        ]);

        $periode = Periode::findOrFail(
            $validated['periode_id']
        );

        $filePath = null;

        if ($request->hasFile('file_bukti')) {
            $file = $request->file('file_bukti');
            $namaFile = 'kegiatan_'. $lembaga->kode. '_'. $periode->tahun. '_'. time(). '.'. $file->getClientOriginalExtension();
            $filePath = $file->storeAs('laporan-kegiatan/bukti', $namaFile, 'public');
        }

        LaporanKegiatan::create([
            'lembaga_id' => $lembaga->id,
            'periode_id' => $periode->id,
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'tanggal_mulai' => $validated['tanggal_mulai'],
            'tanggal_selesai' => $validated['tanggal_selesai'],
            'keterangan' => $validated['keterangan'] ?? null,
            'file_bukti' => $filePath,
            'status' => 'pending',
        ]);

        return back()->with(
            'success',
            'Laporan kegiatan berhasil ditambahkan dan menunggu verifikasi.'
        );
    }

    public function show(LaporanKegiatan $laporanKegiatan)
    {
        $user = auth()->user();

        $laporanKegiatan->load([
            'lembaga.profil',
            'periode',
            'verifiedBy',
        ]);

        // Lembaga hanya boleh melihat laporan miliknya
        if (
            $user->hasRole('lembaga') &&
            $laporanKegiatan->lembaga_id !== $user->lembaga?->id
        ) {
            abort(403);
        }

        return Inertia::render('laporan-kegiatan/show', [
            'laporanKegiatan' => $laporanKegiatan,
            'role' => $user->getRoleNames()->first(),
        ]);
    }

    public function update(Request $request, LaporanKegiatan $laporanKegiatan)
    {
        $user = auth()->user();

        // Hanya lembaga yang dapat mengedit laporan
        if (!$user->hasRole('lembaga')) {
            abort(403, 'Anda tidak memiliki akses untuk mengubah laporan kegiatan.');
        }

        $lembaga = $user->lembaga;

        if (!$lembaga) {
            abort(403, 'Data lembaga tidak ditemukan.');
        }

        // Pastikan laporan milik lembaga yang sedang login
        if ($laporanKegiatan->lembaga_id !== $lembaga->id) {
            abort(403, 'Anda tidak memiliki akses ke laporan ini.');
        }

        // Laporan yang sudah terverifikasi tidak dapat diedit
        if ($laporanKegiatan->status === 'verified') {
            return back()->with(
                'error',
                'Laporan yang sudah terverifikasi tidak dapat diubah.'
            );
        }

        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'nama_kegiatan' => ['required', 'string', 'max:255'],
            'tanggal_mulai' => ['required', 'date'],
            'tanggal_selesai' => ['required','date','after_or_equal:tanggal_mulai'],
            'keterangan' => ['nullable', 'string'],
            'file_bukti' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
        ]);

        $periode = Periode::findOrFail(
            $validated['periode_id']
        );

        $filePath = $laporanKegiatan->file_bukti;

        if ($request->hasFile('file_bukti')) {

            // Hapus file lama
            if ($laporanKegiatan->file_bukti) {
                Storage::disk('public')->delete(
                    $laporanKegiatan->file_bukti
                );
            }

            $file = $request->file('file_bukti');
            $namaFile = 'kegiatan_'. $lembaga->kode. '_'. $periode->tahun. '_'. time(). '.'. $file->getClientOriginalExtension();

            $filePath = $file->storeAs('laporan-kegiatan/bukti',$namaFile,'public');
        }

        $laporanKegiatan->update([
            'periode_id' => $periode->id,
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'tanggal_mulai' => $validated['tanggal_mulai'],
            'tanggal_selesai' => $validated['tanggal_selesai'],
            'keterangan' => $validated['keterangan'] ?? null,
            'file_bukti' => $filePath,
            'status' => 'pending',
            'catatan' => null,
            'verified_by' => null,
            'verified_at' => null,
        ]);

        return back()->with(
            'success',
            'Laporan kegiatan berhasil diperbarui dan menunggu verifikasi kembali.'
        );
    }

    public function destroy(LaporanKegiatan $laporanKegiatan)
    {
        $user = auth()->user();

        // Hanya lembaga yang dapat menghapus laporan
        if (!$user->hasRole('lembaga')) {
            abort(403, 'Anda tidak memiliki akses untuk menghapus laporan kegiatan.');
        }

        if (in_array($laporanKegiatan->status, ['verified', 'rejected'])) {
            return back()->with(
                'error',
                'Laporan dengan status tersebut tidak dapat dihapus.'
            );
        }

        $lembaga = $user->lembaga;

        if (!$lembaga) {
            abort(403, 'Data lembaga tidak ditemukan.');
        }

        // Pastikan laporan milik lembaga yang sedang login
        if ($laporanKegiatan->lembaga_id !== $lembaga->id) {
            abort(403, 'Anda tidak memiliki akses ke laporan ini.');
        }

        // Laporan yang sudah terverifikasi tidak boleh dihapus
        if ($laporanKegiatan->status === 'verified') {
            return back()->with(
                'error',
                'Laporan yang sudah terverifikasi tidak dapat dihapus.'
            );
        }

        // Hapus file bukti jika ada
        if ($laporanKegiatan->file_bukti) {
            Storage::disk('public')->delete(
                $laporanKegiatan->file_bukti
            );
        }

        // Soft delete
        $laporanKegiatan->delete();

        return back()->with(
            'success',
            'Laporan kegiatan berhasil dihapus.'
        );
    }

    public function verifikasi(Request $request, LaporanKegiatan $laporanKegiatan) 
    {
        $user = auth()->user();

        // Hanya Dindik dan Forum
        if (!$user->hasAnyRole(['dindik', 'forum'])) {
            abort(403, 'Anda tidak memiliki akses untuk melakukan verifikasi.');
        }

        $validated = $request->validate([
            'status' => [
                'required',
                'in:verified,revision,rejected',
            ],

            'catatan' => [
                'nullable',
                'string',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Validasi catatan
        |--------------------------------------------------------------------------
        */

        if (
            in_array($validated['status'], ['revision', 'rejected']) &&
            empty($validated['catatan'])
        ) {
            return back()->with(
                'error',
                'Catatan wajib diisi untuk status Perlu Revisi atau Ditolak.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Update Verifikasi
        |--------------------------------------------------------------------------
        */

        $laporanKegiatan->update([
            'status' => $validated['status'],
            'catatan' => $validated['catatan'] ?? null,
            'verified_by' => $user->id,
            'verified_at' => now(),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Pesan
        |--------------------------------------------------------------------------
        */

        $message = match ($validated['status']) {
            'verified' =>
                'Laporan kegiatan berhasil diverifikasi.',

            'revision' =>
                'Laporan kegiatan dikembalikan untuk diperbaiki.',

            'rejected' =>
                'Laporan kegiatan berhasil ditolak.',
        };

        return back()->with(
            'success',
            $message
        );
    }
}