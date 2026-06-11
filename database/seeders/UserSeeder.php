<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            // Super Admin
            [
                'name' => 'Super Admin',
                'email' => 'admin@gmail.com',
                'nik' => '9999999999999999',
                'password' => Hash::make('password'),
                'role_id' => 1,
            ],

            // Users untuk Pengurus - Kecamatan Kota
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad.fauzi@tpq1.com',
                'nik' => '1234567890123456',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@tpq2.com',
                'nik' => '1234567890123457',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Citra Dewi',
                'email' => 'citra.dewi@tpq3.com',
                'nik' => '1234567890123458',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Doni Hermawan',
                'email' => 'doni.hermawan@tpq4.com',
                'nik' => '1234567890123459',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Eka Putri',
                'email' => 'eka.putri@tpq5.com',
                'nik' => '1234567890123460',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Fajar Riyanto',
                'email' => 'fajar.riyanto@tpq6.com',
                'nik' => '1234567890123461',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Gita Hartono',
                'email' => 'gita.hartono@tpq7.com',
                'nik' => '1234567890123462',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Hendra Wijaya',
                'email' => 'hendra.wijaya@tpq8.com',
                'nik' => '1234567890123463',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Ida Kusuma',
                'email' => 'ida.kusuma@tpq9.com',
                'nik' => '1234567890123464',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Joko Setiawan',
                'email' => 'joko.setiawan@tpq10.com',
                'nik' => '1234567890123465',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Krisna Mulyadi',
                'email' => 'krisna.mulyadi@tpq11.com',
                'nik' => '1234567890123466',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Lina Handari',
                'email' => 'lina.handari@tpq12.com',
                'nik' => '1234567890123467',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Maulana Reza',
                'email' => 'maulana.reza@tpq13.com',
                'nik' => '1234567890123468',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Nur Indah',
                'email' => 'nur.indah@tpq14.com',
                'nik' => '1234567890123469',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Oki Pratama',
                'email' => 'oki.pratama@tpq15.com',
                'nik' => '1234567890123470',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Pramono Sigit',
                'email' => 'pramono.sigit@tpq16.com',
                'nik' => '1234567890123471',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Qisti Maulana',
                'email' => 'qisti.maulana@tpq17.com',
                'nik' => '1234567890123472',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],

            // Users untuk Pengurus - Kecamatan Mojoroto
            [
                'name' => 'Risvan Gunawan',
                'email' => 'risvan.gunawan@tpq18.com',
                'nik' => '1234567890123473',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti.nurhaliza@tpq19.com',
                'nik' => '1234567890123474',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Taufik Rahman',
                'email' => 'taufik.rahman@tpq20.com',
                'nik' => '1234567890123475',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Umar Saputra',
                'email' => 'umar.saputra@tpq21.com',
                'nik' => '1234567890123476',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Vega Rianto',
                'email' => 'vega.rianto@tpq22.com',
                'nik' => '1234567890123477',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Wahyu Prasetya',
                'email' => 'wahyu.prasetya@tpq23.com',
                'nik' => '1234567890123478',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Xiomara Dwi',
                'email' => 'xiomara.dwi@tpq24.com',
                'nik' => '1234567890123479',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Yusuf Hariri',
                'email' => 'yusuf.hariri@tpq25.com',
                'nik' => '1234567890123480',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Zaki Maulana',
                'email' => 'zaki.maulana@tpq26.com',
                'nik' => '1234567890123481',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Amelia Putri',
                'email' => 'amelia.putri@tpq27.com',
                'nik' => '1234567890123482',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Bambang Sutrisno',
                'email' => 'bambang.sutrisno@tpq28.com',
                'nik' => '1234567890123483',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Cahaya Nirmala',
                'email' => 'cahaya.nirmala@tpq29.com',
                'nik' => '1234567890123484',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Dendi Prabowo',
                'email' => 'dendi.prabowo@tpq30.com',
                'nik' => '1234567890123485',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Eka Saputra',
                'email' => 'eka.saputra@tpq31.com',
                'nik' => '1234567890123486',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Fitri Handini',
                'email' => 'fitri.handini@tpq32.com',
                'nik' => '1234567890123487',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Guntur Permadi',
                'email' => 'guntur.permadi@tpq33.com',
                'nik' => '1234567890123488',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],

            // Users untuk Pengurus - Kecamatan Pesantren
            [
                'name' => 'Hafidz Ramadan',
                'email' => 'hafidz.ramadan@tpq34.com',
                'nik' => '1234567890123489',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Intan Megawati',
                'email' => 'intan.megawati@tpq35.com',
                'nik' => '1234567890123490',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Jajang Nurdin',
                'email' => 'jajang.nurdin@tpq36.com',
                'nik' => '1234567890123491',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Karni Wijaya',
                'email' => 'karni.wijaya@tpq37.com',
                'nik' => '1234567890123492',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Lena Susanti',
                'email' => 'lena.susanti@tpq38.com',
                'nik' => '1234567890123493',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Mukhlis Sidiq',
                'email' => 'mukhlis.sidiq@tpq39.com',
                'nik' => '1234567890123494',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Nabila Sari',
                'email' => 'nabila.sari@tpq40.com',
                'nik' => '1234567890123495',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Osman Hidayat',
                'email' => 'osman.hidayat@tpq41.com',
                'nik' => '1234567890123496',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Patma Handoko',
                'email' => 'patma.handoko@tpq42.com',
                'nik' => '1234567890123497',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Qolbu Maujud',
                'email' => 'qolbu.maujud@tpq43.com',
                'nik' => '1234567890123498',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Rini Kusuma',
                'email' => 'rini.kusuma@tpq44.com',
                'nik' => '1234567890123499',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Sakti Ananda',
                'email' => 'sakti.ananda@tpq45.com',
                'nik' => '1234567890123500',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Tita Nurlaila',
                'email' => 'tita.nurlaila@tpq46.com',
                'nik' => '1234567890123501',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Ummu Habibah',
                'email' => 'ummu.habibah@tpq47.com',
                'nik' => '1234567890123502',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Vina Kristina',
                'email' => 'vina.kristina@tpq48.com',
                'nik' => '1234567890123503',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Wahab Mujiono',
                'email' => 'wahab.mujiono@tpq49.com',
                'nik' => '1234567890123504',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
            [
                'name' => 'Yasmin Salim',
                'email' => 'yasmin.salim@tpq50.com',
                'nik' => '1234567890123505',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ],
        ];

        User::insert($users);
    }
}
