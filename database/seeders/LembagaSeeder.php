<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lembaga;

class LembagaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lembaga::create([
            'kategori_id' => 1,
            'nama' => 'TPQ Al Hidayah',
            'alamat' => 'Jl. Mawar No. 10',
            'kelurahan' => 'Mojoroto',
            'kecamatan' => 'Mojoroto',
            'kabkota' => 'Kota Kediri',
            'telp' => '08123456789',
            'email' => 'tpq@example.com',
            'jumlah_guru' => 10,
            'jumlah_siswa' => 120,
            'sk' => 'SK-001',
            'file_pendukung' => 'sk_tpq.pdf'
        ]);
    }
}
