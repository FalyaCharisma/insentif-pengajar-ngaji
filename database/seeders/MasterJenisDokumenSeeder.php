<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterJenisDokumenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('master_jenis_dokumen')->insert([

            [
                'nama' => 'SK Pendirian',
                'is_required' => true,
            ],

            [
                'nama' => 'SK Operasional',
                'is_required' => true,
            ],

            [
                'nama' => 'NPWP Lembaga',
                'is_required' => true,
            ],

            [
                'nama' => 'Rekening Bank',
                'is_required' => true,
            ],

            [
                'nama' => 'Surat Domisili',
                'is_required' => false,
            ],

        ]);
    }
}
