<?php

namespace Database\Seeders;

use App\Models\Forum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        $kategoriIds = DB::table('kategori')->pluck('id')->toArray();

        Forum::insert([
            [
                'nama' => 'Forum Guru Ngaji Al-Hikmah',
                'kategori_id' => $kategoriIds[0] ?? 1,
                'nik' => '3201010101010001',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Forum Pendidikan Islam Kota',
                'kategori_id' => $kategoriIds[1] ?? 1,
                'nik' => '3201010101010002',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Forum TPQ Nasional',
                'kategori_id' => $kategoriIds[2] ?? 1,
                'nik' => '3201010101010003',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}