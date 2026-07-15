<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use Illuminate\Database\Seeder;

class ProfilLembagaSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Lembaga::all() as $lembaga) {

            ProfilLembaga::create([
                'lembaga_id' => $lembaga->id,

                'nomor_registrasi' => 'REG-' . str_pad($lembaga->id, 5, '0', STR_PAD_LEFT),
                'tahun_berdiri' => rand(1995, 2022),

                'alamat' => 'Jl. Contoh No. ' . rand(1, 100),

                'provinsi' => 'Jawa Timur',
                'kabupaten' => 'Kota Kediri',
                'kecamatan' => 'Kota',
                'desa' => 'Balowerti',
                'kode_pos' => '64121',

                'telepon' => '0354' . rand(100000, 999999),
                'email' => strtolower($lembaga->kode_lembaga) . '@mail.com',
                'website' => null,

                'nama_pimpinan' => 'Ahmad Fauzi',
                'jabatan_pimpinan' => 'Kepala Lembaga',

                'nama_operator' => 'Admin Lembaga',
                'no_hp_operator' => '08123' . rand(1000000, 9999999),

                'nama_bank' => 'Bank Jatim',
                'nomor_rekening' => rand(1000000000, 9999999999),
                'atas_nama_rekening' => $lembaga->nama,

                'status_verifikasi' => 'pending',
                'catatan_verifikasi' => null,
                'verified_by' => null,
                'verified_at' => null,
            ]);
        }
    }
}