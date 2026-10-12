<?php
namespace Database\Seeders;

use App\Models\PendidikanTerakhir;
use Illuminate\Database\Seeder;

class PendidikanTerakhirSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['nama' => 'S2', 'urutan' => 1],
            ['nama' => 'S1', 'urutan' => 2],
            ['nama' => 'D4', 'urutan' => 3],
            ['nama' => 'D3', 'urutan' => 4],
            ['nama' => 'SMA', 'urutan' => 5],
            ['nama' => 'MA', 'urutan' => 6],
        ];

        foreach ($data as $item) {
            PendidikanTerakhir::updateOrCreate(
                ['nama' => $item['nama']],
                ['urutan' => $item['urutan']],
            );
        }
    }
}