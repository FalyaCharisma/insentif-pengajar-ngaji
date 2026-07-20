<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LembagaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'kode' => 'LMB00001',
                'nama' => 'TPQ Al Huda',
                'kategori_id' => 1,
            ],
            [
                'kode' => 'LMB00002',
                'nama' => 'TPQ Nurul Iman',
                'kategori_id' => 1,
            ],
            [
                'kode' => 'LMB00003',
                'nama' => 'Madin Al Ikhlas',
                'kategori_id' => 2,
            ],
            [
                'kode' => 'LMB00004',
                'nama' => 'Sekolah Minggu Eben Haezer',
                'kategori_id' => 3,
            ],
            [
                'kode' => 'LMB00005',
                'nama' => 'TPA Baiturrahman',
                'kategori_id' => 1,
            ],
        ];

        foreach ($data as $item) {

            $user = User::create([
                'name' => $item['nama'],
                'email' => strtolower($item['kode']) . '@mail.com',
                'password' => Hash::make($item['kode']) . '@kdr',
                'status' => 'aktif',
                'force_change_password' => true,
            ]);

            $user->assignRole('lembaga');

            Lembaga::create([
                'user_id' => $user->id,
                'kategori_id' => $item['kategori_id'],
                'kode' => $item['kode'],
                'nama' => $item['nama'],
            ]);
        }
    }
}