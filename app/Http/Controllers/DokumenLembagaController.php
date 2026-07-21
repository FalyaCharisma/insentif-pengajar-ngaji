<?php

namespace App\Http\Controllers;

use App\Models\DokumenLembaga;
use App\Models\JenisDokumen;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DokumenLembagaController extends Controller
{
    public function index(Lembaga $lembaga)
    {
        $lembaga->load([
            'kategori',
            'user',
            'profil',
        ]);

        $dokumen = DokumenLembaga::with('jenisDokumen')
            ->where('lembaga_id', $lembaga->id)
            ->latest()
            ->paginate(10)
            ->through(function ($item) {
                $item->url = Storage::url($item->path);

                return $item;
            });

        $uploadedIds = DokumenLembaga::where('lembaga_id', $lembaga->id)
            ->pluck('jenis_dokumen_id');

        $jenisDokumen = JenisDokumen::whereNotIn('id', $uploadedIds)
            ->orderBy('nama')
            ->get();

        return Inertia::render('lembaga/dokumen/index', [
            'lembaga' => $lembaga,
            'dokumen' => $dokumen,
            'jenisDokumen' => $jenisDokumen,
            'filters' => request()->only('search', 'sort'),
        ]);
    }

    public function store(Request $request, Lembaga $lembaga)
    {
        $request->validate([
            'jenis_dokumen_id' => ['required', 'exists:jenis_dokumen,id'],
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2120'],
        ]);

        $dokumen = DokumenLembaga::where('lembaga_id', $lembaga->id)
            ->where('jenis_dokumen_id', $request->jenis_dokumen_id)
            ->first();

        if (
            $dokumen &&
            $dokumen->path &&
            Storage::disk('public')->exists($dokumen->path)
        ) {
            Storage::disk('public')->delete($dokumen->path);
        }

        $file = $request->file('file');

        $jenisDokumen = JenisDokumen::findOrFail($request->jenis_dokumen_id);

        $extension = $file->getClientOriginalExtension();

        $namaFile = Str::slug($jenisDokumen->nama, '_')
            . '_'
            . Carbon::now()->format('Ymd_His')
            . '.'
            . $extension;

        $path = $file->storeAs(
            "dokumen-lembaga/{$lembaga->id}",
            $namaFile,
            "public"
        );

        DokumenLembaga::updateOrCreate(
            [
                'lembaga_id' => $lembaga->id,
                'jenis_dokumen_id' => $request->jenis_dokumen_id,
            ],
            [
                'nama_file' => $namaFile,
                'path' => $path,
                'status_verifikasi' => 'pending',
                'catatan_verifikasi' => null,
                'verified_by' => null,
                'verified_at' => null,
            ]
        );

        return back()->with('success', 'Dokumen berhasil diupload.');
    }

    public function update(Request $request, DokumenLembaga $dokumenLembaga)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2120'],
        ]);

        if (
            $dokumenLembaga->path &&
            Storage::disk('public')->exists($dokumenLembaga->path)
        ) {
            Storage::disk('public')->delete($dokumenLembaga->path);
        }

        $file = $request->file('file');

        $extension = $file->getClientOriginalExtension();

        $namaFile = Str::slug($dokumenLembaga->jenisDokumen->nama, '_')
            . '_'
            . Carbon::now()->format('Ymd_His')
            . '.'
            . $extension;

        $path = $file->storeAs(
            "dokumen-lembaga/{$dokumenLembaga->lembaga_id}",
            $namaFile,
            "public"
        );

        $dokumenLembaga->update([
            'nama_file' => $namaFile,
            'path' => $path,
            'status_verifikasi' => 'pending',
            'catatan_verifikasi' => null,
            'verified_by' => null,
            'verified_at' => null,
        ]);

        return back()->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function verifikasi(Request $request, DokumenLembaga $dokumenLembaga)
    {
        $request->validate([
            'status_verifikasi' => ['required', 'in:disetujui,ditolak'],
            'catatan_verifikasi' => [
                'required_if:status_verifikasi,ditolak',
                'nullable',
                'string',
                'max:500',
            ],
        ]);

        $dokumenLembaga->update([
            'status_verifikasi' => $request->status_verifikasi,
            'catatan_verifikasi' => $request->catatan_verifikasi,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with(
            'success',
            'Dokumen berhasil diverifikasi.'
        );
    }

    public function destroy(DokumenLembaga $dokumenLembaga)
    {
        if (
            $dokumenLembaga->path &&
            Storage::disk('public')->exists($dokumenLembaga->path)
        ) {
            Storage::disk('public')->delete($dokumenLembaga->path);
        }

        $dokumenLembaga->delete();

        return back()->with('success', 'Dokumen berhasil dihapus.');
    }
}