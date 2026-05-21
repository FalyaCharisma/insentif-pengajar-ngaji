<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kategori')->insert([
            [
                'nama' => 'TPA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'TPQ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Madin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
