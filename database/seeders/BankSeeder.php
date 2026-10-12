<?php
namespace Database\Seeders;

use App\Models\Bank;
use Illuminate\Database\Seeder;

class BankSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['nama' => 'Bank Jatim', 'urutan' => 1],
            ['nama' => 'BRI', 'urutan' => 2],
            ['nama' => 'BNI', 'urutan' => 3],
            ['nama' => 'Mandiri', 'urutan' => 4],
            ['nama' => 'BCA', 'urutan' => 5],
            ['nama' => 'BTN', 'urutan' => 6],
            ['nama' => 'BSI', 'urutan' => 7],
            ['nama' => 'CIMB Niaga', 'urutan' => 8],
            ['nama' => 'Danamon', 'urutan' => 9],
            ['nama' => 'Permata Bank', 'urutan' => 10],
            ['nama' => 'Panin Bank', 'urutan' => 11],
            ['nama' => 'Bank Mega', 'urutan' => 12],
            ['nama' => 'Bank Syariah Jatim', 'urutan' => 13],
        ];

        foreach ($data as $item) {
            Bank::updateOrCreate(
                ['nama' => $item['nama']],
                ['urutan' => $item['urutan']],
            );
        }
    }
}