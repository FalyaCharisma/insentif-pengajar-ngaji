<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use App\Models\Pengajar;
use Illuminate\Database\Seeder;

class PengajarSeeder extends Seeder
{
    private array $firstNames = [
        'Ahmad', 'Muhammad', 'Abdul', 'Nur', 'Ali', 'Hasan', 'Husain', 'Khalid', 'Umar', 'Mahmud',
        'Ibrahim', 'Ismail', 'Yusuf', 'Amin', 'Fahruddin', 'Saifuddin', 'Syamsuddin', 'Imam', 'Wildan', 'Hamzah',
        'Siti', 'Fatimah', 'Aisyah', 'Zainab', 'Maimunah', 'Khadijah', 'Mariam', 'Hafsah', 'Ruqayyah', 'Ummi',
        'Halimah', 'Nafisah', 'Masruroh', 'Khusnul', 'Jamilah', 'Karimah', 'Lathifah', 'Habibah', 'Shofiyah', 'Rohmah',
    ];

    private array $lastNames = [
        'Fauzi', 'Hidayat', 'Rahman', 'Syukur', 'Sholeh', 'Nashir', 'Karim', 'Aziz', 'Hakim', 'Malik',
        'Anwar', 'Bashir', 'Taqi', 'Siddiq', 'Amin', 'Kamil', 'Latif', 'Wahid', 'Zaki', 'Rois',
    ];

    private array $jabatan = [
        'Guru Kelas', 'Guru Ngaji', 'Guru Tahfidz', 'Guru Praktek Ibadah', 'Guru Al-Qur\'an',
        'Guru Hadits', 'Guru Fiqih', 'Guru Akidah Akhlak', 'Guru Bahasa Arab', 'Koordinator Pengajar',
    ];

    private array $pendidikanTerakhir = ['SMA', 'MA', 'S1', 'S2', 'D3', 'D4'];
    private array $jurusan = ['Pendidikan Agama', 'Pendidikan Islam', 'PGMI', 'PIAUD', 'Sastra Arab', 'Syariah', 'Ilmu Hadits', 'Tafsir', 'Umum'];
    private array $universitas = ['UIN Kediri', 'UNISKA Kediri', 'IAIN Kediri', 'Universitas Brawijaya', 'Universitas Negeri Malang', 'Universitas Islam Malang'];
    private array $agama = ['Islam'];
    private array $bank = ['Bank Jatim', 'BRI', 'Mandiri', 'BNI', 'BCA'];
    private array $statusInsentif = ['aktif', 'nonaktif', null];

    public function run(): void
    {
        $lembagaList = Lembaga::with('profil')->get();

        foreach ($lembagaList as $lembaga) {
            $kecamatan = $lembaga->profil?->kecamatan ?? 'Kota';

            for ($i = 1; $i <= 10; $i++) {
                $nik = $this->generateNIK($lembaga->id, $i);
                $nama = $this->generateName();

                Pengajar::create([
                    'lembaga_id' => $lembaga->id,
                    'nik' => $nik,
                    'nama' => $nama,

                    'tempat_lahir' => 'Kota Kediri',
                    'tgl_lahir' => now()->subYears(rand(22, 55))->subDays(rand(1, 365)),
                    'jk' => fake()->randomElement(['laki-laki', 'perempuan']),

                    'jabatan' => $this->jabatan[array_rand($this->jabatan)],
                    'pendidikan_terakhir' => $this->pendidikanTerakhir[array_rand($this->pendidikanTerakhir)],
                    'jurusan' => $this->jurusan[array_rand($this->jurusan)],
                    'sekolah_universitas' => $this->universitas[array_rand($this->universitas)],
                    'tahun_lulus' => (string) rand(1995, 2024),
                    'agama' => 'Islam',

                    'alamat' => 'Jl. ' . ($lembaga->profil?->kelurahan ?? 'Balowerti') . ' No. ' . rand(1, 200),
                    'kelurahan' => $lembaga->profil?->kelurahan ?? 'Balowerti',
                    'kecamatan' => $kecamatan,
                    'kabkota' => 'Kota Kediri',
                    'provinsi' => 'Jawa Timur',

                    'no_hp' => '0857' . str_pad((string) rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),

                    'bank' => $this->bank[array_rand($this->bank)],
                    'no_rekening' => (string) rand(1000000000, 9999999999),
                    'no_bpjs' => rand(0, 1) ? (string) rand(100000000000000, 999999999999999) : null,

                    'status_insentif' => $this->statusInsentif[array_rand($this->statusInsentif)],
                    'status' => 'aktif',
                ]);
            }
        }
    }

    private function generateNIK(int $lembagaId, int $index): string
    {
        // Generate NIK unik: 3571 (Kota Kediri) + lembagaId (3 digit) + index (2 digit) + 5 random digits
        return '3571' . str_pad((string) $lembagaId, 3, '0', STR_PAD_LEFT)
            . str_pad((string) $index, 2, '0', STR_PAD_LEFT)
            . str_pad((string) rand(1, 99999), 5, '0', STR_PAD_LEFT);
    }

    private function generateName(): string
    {
        return $this->firstNames[array_rand($this->firstNames)]
            . ' '
            . $this->lastNames[array_rand($this->lastNames)];
    }
}