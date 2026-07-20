<?php

namespace App\Http\Controllers;

use App\Models\KategoriLembaga;
use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfilLembagaController extends Controller
{
    /**
     * Menampilkan profil lembaga.
     */
    public function index(Lembaga $lembaga)
    {
        $lembaga->load([
            'kategori',
            'user',
            'profil',
        ]);

        $totalDokumen = $lembaga->dokumen()->count();
        $pending = $lembaga->dokumen()
            ->where('status_verifikasi', 'pending')
            ->count();

        $disetujui = $lembaga->dokumen()
            ->where('status_verifikasi', 'disetujui')
            ->count();

        $ditolak = $lembaga->dokumen()
            ->where('status_verifikasi', 'ditolak')
            ->count();

        return Inertia::render('lembaga/profil/index', [
            'lembaga' => $lembaga,
            'kategori' => KategoriLembaga::orderBy('nama')->get(),

            'statistik' => [
                'total' => $totalDokumen,
                'pending' => $pending,
                'disetujui' => $disetujui,
                'ditolak' => $ditolak,
            ],
        ]);
    }

    /**
     * Menyimpan / memperbarui profil lembaga.
     */
    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            // Informasi
            'nomor_registrasi' => ['required', 'string', 'max:100'],
            'tahun_berdiri' => ['required', 'integer', 'digits:4', 'between:1900,' . date('Y')],

            // Alamat
            'alamat' => ['required', 'string'],
            'provinsi' => ['required', 'array'],
            'kabupaten' => ['required', 'array'],
            'kecamatan' => ['required', 'array'],
            'kelurahan' => ['required', 'array'],
            'kode_pos' => ['required', 'digits:5'],

            // Kontak
            'telepon' => ['required', 'regex:/^[0-9+\-\s]+$/', 'max:20'],
            'email' => ['required', 'email', 'max:100'],
            'website' => ['nullable', 'url'],

            // Pimpinan
            'nama_pimpinan' => ['required', 'string', 'max:100'],
            'jabatan_pimpinan' => ['required', 'string', 'max:100'],

            // Operator
            'nama_operator' => ['required', 'string', 'max:100'],
            'no_hp_operator' => ['required', 'regex:/^[0-9+\-\s]+$/', 'max:20'],

            // Rekening
            'nama_bank' => ['required', 'string', 'max:100'],
            'nomor_rekening' => ['required', 'string', 'max:50'],
            'atas_nama_rekening' => ['required', 'string', 'max:100'],
        ]);

        // Wilayah
        $validated['provinsi'] = data_get($request->provinsi, 'label');
        $validated['kode_provinsi'] = data_get($request->provinsi, 'value');

        $validated['kabupaten'] = data_get($request->kabupaten, 'label');
        $validated['kode_kabupaten'] = data_get($request->kabupaten, 'value');

        $validated['kecamatan'] = data_get($request->kecamatan, 'label');
        $validated['kode_kecamatan'] = data_get($request->kecamatan, 'value');

        $validated['kelurahan'] = data_get($request->kelurahan, 'label');
        $validated['kode_kelurahan'] = data_get($request->kelurahan, 'value');

        // Reset status verifikasi jika profil diubah
        $validated['status_verifikasi'] = 'pending';
        $validated['catatan_verifikasi'] = null;
        $validated['verified_by'] = null;
        $validated['verified_at'] = null;

        $lembaga->profil()->updateOrCreate(
            [
                'lembaga_id' => $lembaga->id,
            ],
            $validated
        );

        return back()->with(
            'success',
            'Profil lembaga berhasil disimpan.'
        );
    }

    /**
     * Verifikasi profil lembaga.
     */
    public function verifikasi(Request $request, ProfilLembaga $profil)
    {
        $request->validate([
            'status_verifikasi' => [
                'required',
                Rule::in([
                    'disetujui',
                    'ditolak',
                ]),
            ],
            'catatan_verifikasi' => [
                'nullable',
                'string',
            ],
        ]);

        $profil->update([
            'status_verifikasi' => $request->status_verifikasi,
            'catatan_verifikasi' => $request->catatan_verifikasi,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with(
            'success',
            'Profil berhasil diverifikasi.'
        );
    }
}