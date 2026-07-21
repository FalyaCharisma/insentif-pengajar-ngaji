<?php

namespace Database\Seeders;

use App\Models\Forum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Forum Guru Ngaji Al-Hikmah',
                'telepon' => '081234567890',
            ],
            [
                'nama' => 'Forum Pendidikan Islam Kota',
                'telepon' => '081234567891',
            ],
            [
                'nama' => 'Forum TPQ Nasional',
                'telepon' => '081234567892',
            ],
        ];

        foreach ($data as $item) {

            $kode = Forum::generateKode();

            $user = User::create([
                'name' => $item['nama'],
                'email' => strtolower($kode) . '@mail.com',
                'password' => Hash::make($kode . '@kdr'),
                'force_change_password' => true,
                'status' => 'aktif',
            ]);

            $user->assignRole('forum');

            Forum::create([
                'user_id' => $user->id,
                'kode' => $kode,
                'nama' => $item['nama'],
                'telepon' => $item['telepon'],
                'status' => 'aktif',
            ]);
        }
    }
}