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
        $this->authorize('view', $lembaga);
        
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
        $validated = $request->validate(
            [
                // Informasi
                'nomor_registrasi' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('profil_lembaga', 'nomor_registrasi')->ignore($lembaga->profil?->id),
                ],
                'tahun_berdiri' => [
                    'required',
                    'integer',
                    'digits:4',
                    'between:1900,' . date('Y'),
                ],

                // Alamat
                'alamat' => [
                    'required',
                    'string',
                ],
                'provinsi' => [
                    'required',
                    'array',
                ],
                'kabupaten' => [
                    'required',
                    'array',
                ],
                'kecamatan' => [
                    'required',
                    'array',
                ],
                'kelurahan' => [
                    'required',
                    'array',
                ],
                'kode_pos' => [
                    'required',
                    'digits:5',
                ],

                // Kontak
                'telepon' => [
                    'required',
                    'regex:/^[0-9+\-\s]+$/',
                    'max:20',
                ],
                'email' => [
                    'required',
                    'email',
                    'max:100',
                ],
                'website' => [
                    'nullable',
                    'url',
                    'regex:/^https?:\/\/(?!www\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}.*$/',
                ],

                // Pimpinan
                'nama_pimpinan' => [
                    'required',
                    'string',
                    'max:100',
                ],
                'jabatan_pimpinan' => [
                    'required',
                    'string',
                    'max:100',
                ],

                // Operator
                'nama_operator' => [
                    'required',
                    'string',
                    'max:100',
                ],
                'no_hp_operator' => [
                    'required',
                    'regex:/^[0-9+\-\s]+$/',
                    'max:20',
                ],

                // Rekening
                'nama_bank' => [
                    'required',
                    'string',
                    'max:100',
                ],
                'nomor_rekening' => [
                    'required',
                    'digits_between:5,50',
                ],
                'atas_nama_rekening' => [
                    'required',
                    'string',
                    'max:100',
                ],
            ],
            [
                // Informasi
                'nomor_registrasi.required' => 'Nomor registrasi wajib diisi.',
                'nomor_registrasi.max' => 'Nomor registrasi maksimal 100 karakter.',
                'nomor_registrasi.unique' => 'Nomor registrasi sudah digunakan.',

                'tahun_berdiri.required' => 'Tahun berdiri wajib diisi.',
                'tahun_berdiri.integer' => 'Tahun berdiri harus berupa angka.',
                'tahun_berdiri.digits' => 'Tahun berdiri harus terdiri dari 4 digit.',
                'tahun_berdiri.between' => 'Tahun berdiri harus antara 1900 sampai ' . date('Y') . '.',

                // Alamat
                'alamat.required' => 'Alamat wajib diisi.',

                'provinsi.required' => 'Provinsi wajib dipilih.',
                'kabupaten.required' => 'Kabupaten/Kota wajib dipilih.',
                'kecamatan.required' => 'Kecamatan wajib dipilih.',
                'kelurahan.required' => 'Kelurahan wajib dipilih.',

                'kode_pos.required' => 'Kode pos wajib diisi.',
                'kode_pos.digits' => 'Kode pos harus terdiri dari 5 digit.',

                // Kontak
                'telepon.required' => 'Nomor telepon wajib diisi.',
                'telepon.regex' => 'Nomor telepon hanya boleh berisi angka, spasi, tanda "+" atau "-".',
                'telepon.max' => 'Nomor telepon maksimal 20 karakter.',

                'email.required' => 'Email wajib diisi.',
                'email.email' => 'Format email tidak valid.',
                'email.max' => 'Email maksimal 100 karakter.',

                'website.url' => 'Format website tidak valid.',
                'website.regex' => 'Website harus menggunakan format http:// atau https:// dan tidak boleh diawali dengan "www.".',

                // Pimpinan
                'nama_pimpinan.required' => 'Nama pimpinan wajib diisi.',
                'nama_pimpinan.max' => 'Nama pimpinan maksimal 100 karakter.',

                'jabatan_pimpinan.required' => 'Jabatan pimpinan wajib diisi.',
                'jabatan_pimpinan.max' => 'Jabatan pimpinan maksimal 100 karakter.',

                // Operator
                'nama_operator.required' => 'Nama operator wajib diisi.',
                'nama_operator.max' => 'Nama operator maksimal 100 karakter.',

                'no_hp_operator.required' => 'Nomor HP operator wajib diisi.',
                'no_hp_operator.regex' => 'Nomor HP operator hanya boleh berisi angka, spasi, tanda "+" atau "-".',
                'no_hp_operator.max' => 'Nomor HP operator maksimal 20 karakter.',

                // Rekening
                'nama_bank.required' => 'Nama bank wajib diisi.',
                'nama_bank.max' => 'Nama bank maksimal 100 karakter.',

                'nomor_rekening.required' => 'Nomor rekening wajib diisi.',
                'nomor_rekening.max' => 'Nomor rekening maksimal 50 karakter.',

                'atas_nama_rekening.required' => 'Atas nama rekening wajib diisi.',
                'atas_nama_rekening.max' => 'Atas nama rekening maksimal 100 karakter.',
            ]
        );

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
                Rule::requiredIf(
                    $request->status_verifikasi === 'ditolak'
                ),
                'nullable',
                'string',
            ],
        ]);

        $profil->update([
            'status_verifikasi' => $request->status_verifikasi,
            'catatan_verifikasi' => $request->status_verifikasi === 'ditolak'
                ? $request->catatan_verifikasi
                : null,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with(
            'success',
            'Profil berhasil diverifikasi.'
        );
    }
}