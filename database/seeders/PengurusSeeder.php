<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pengurus;

class PengurusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pengurus::create([
            'lembaga_id' => 1,
            'nik' => '1234567890123456',
            'nama' => 'Ahmad Fauzi',
            'tempat_lahir' => 'Kediri',
            'tgl_lahir' => '1995-01-10',
            'jk' => 'L',
            'jabatan' => 'Ketua',
            'pendidikan_terakhir' => 'S1',
            'jurusan' => 'Teknik Informatika',
            'sekolah_universitas' => 'Universitas Brawijaya',
            'tahun_lulus' => 2018,
            'agama' => 'Islam',
            'alamat' => 'Jl. Contoh No. 1',
            'kelurahan' => 'Ringinsirah',
            'kecamatan' => 'Sumbergempol',
            'kabkota' => 'Tulungagung',
            'no_hp' => '08123456789',
            'bank' => 'BCA',
            'no_rekening' => '1234567890',
            'no_bpjs' => '000123456789',
            'pas_foto' => null,
            'status_insentif' => 'aktif',
        ]);
    }
}
