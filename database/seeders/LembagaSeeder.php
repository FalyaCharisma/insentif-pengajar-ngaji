<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LembagaSeeder extends Seeder
{
    private array $kecamatanList = ['Mojoroto', 'Kota', 'Pesantren'];

    private array $kategoriIds = [1, 2, 3]; // TPA, TPQ, Madin

    private array $namaLembaga = [
        'TPQ', 'TPA', 'Madin', 'RA', 'PIAUD', 'DTA', 'MDTA',
        'Sekolah Minggu', 'PAUD', 'TK Islam',
    ];

    public function run(): void
    {
        $counter = 1;

        foreach ($this->kecamatanList as $kecamatan) {

            for ($i = 1; $i <= 25; $i++) {
                $kode = 'LMB' . str_pad((string) $counter, 5, '0', STR_PAD_LEFT);
                $nama = $this->generateNamaLembaga($kecamatan, $i);

                $user = User::create([
                    'name' => $nama,
                    'email' => strtolower($kode) . '@mail.com',
                    'password' => Hash::make('password'),
                    'status' => 'aktif',
                    'force_change_password' => false,
                ]);

                $user->assignRole('lembaga');

                Lembaga::create([
                    'user_id' => $user->id,
                    'kategori_id' => $this->kategoriIds[array_rand($this->kategoriIds)],
                    'kode' => $kode,
                    'nama' => $nama,
                ]);

                $counter++;
            }
        }
    }

    private function generateNamaLembaga(string $kecamatan, int $index): string
    {
        unset($kecamatan);
        $prefix = $this->namaLembaga[array_rand($this->namaLembaga)];
        $suffixes = ['Al Huda', 'Al Ikhlas', 'Al Falah', 'Al Barokah', 'Al Hidayah',
            'Al Mubarak', 'Al Amin', 'Nurul Iman', 'Nurul Huda', 'Nurul Falah',
            'Baiturrahman', 'Al Ihsan', 'Al Jannah', 'Miftahul Ulum', 'Darul Hikmah',
            'Al Kautsar', 'Al Anwar', 'Raudlatul Ulum', 'Al Mutaalim', 'At Taqwa',
        ];

        $suffix = $suffixes[array_rand($suffixes)];

        return "$prefix $suffix $index";
    }
}