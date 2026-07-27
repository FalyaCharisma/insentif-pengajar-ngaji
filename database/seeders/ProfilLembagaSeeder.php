<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use Illuminate\Database\Seeder;

class ProfilLembagaSeeder extends Seeder
{
    private array $kecamatanData = [
        'Mojoroto' => [
            'kelurahan' => ['Bandar Kidul', 'Bandar Lor', 'Banjar Mlati', 'Bujel', 'Campurejo', 'Dermo', 'Gayam', 'Lirboyo', 'Mojoroto', 'Mrican', 'Ngampel', 'Pojok', 'Pulorejo', 'Sukorame', 'Tegalrejo'],
        ],
        'Kota' => [
            'kelurahan' => ['Balowerti', 'Banjaran', 'Dandangan', 'Jagalan', 'Kaliombo', 'Kampung Dalem', 'Kemasan', 'Manisrenggo', 'Ngadirejo', 'Pakis', 'Pesantren', 'Rejomulyo', 'Ringinanom', 'Semampir', 'Setono Pande'],
        ],
        'Pesantren' => [
            'kelurahan' => ['Betet', 'Binaan', 'Gesikan', 'Jamsaren', 'Kepatihan', 'Ketami', 'Langgu', 'Mrican', 'Nglungu', 'Pakunden', 'Pesantren', 'Singonegaran', 'Sukoharjo', 'Tinalan', 'Tosaren'],
        ],
    ];

    public function run(): void
    {
        $lembaga = Lembaga::all();

        // Urutkan: 25 lembaga pertama Mojoroto, 25 kedua Kota, 25 ketiga Pesantren
        $batchSize = 25;

        foreach ($lembaga as $index => $lembagaItem) {
            $kecIndex = intdiv($index, $batchSize);
            $kecamatan = array_keys($this->kecamatanData)[$kecIndex] ?? 'Kota';
            $kelData = $this->kecamatanData[$kecamatan]['kelurahan'];

            ProfilLembaga::create([
                'lembaga_id' => $lembagaItem->id,

                'nomor_registrasi' => 'REG-' . str_pad((string) $lembagaItem->id, 5, '0', STR_PAD_LEFT),
                'tahun_berdiri' => rand(1995, 2022),

                'alamat' => 'Jl. ' . $kelData[array_rand($kelData)] . ' No. ' . rand(1, 100),

                'provinsi' => 'Jawa Timur',
                'kabupaten' => 'Kota Kediri',
                'kecamatan' => $kecamatan,
                'kelurahan' => $kelData[array_rand($kelData)],
                'kode_pos' => '641' . str_pad((string) rand(11, 30), 2, '0', STR_PAD_LEFT),

                'telepon' => '0354' . str_pad((string) rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'email' => strtolower($lembagaItem->kode) . '@mail.com',
                'website' => null,

                'nama_pimpinan' => $this->generateName(),
                'jabatan_pimpinan' => 'Kepala Lembaga',

                'nama_operator' => $this->generateName(),
                'no_hp_operator' => '0812' . str_pad((string) rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),

                'nama_bank' => collect(['Bank Jatim', 'BRI', 'Mandiri', 'BNI', 'BCA'])->random(),
                'nomor_rekening' => (string) rand(1000000000, 9999999999),
                'atas_nama_rekening' => $lembagaItem->nama,

                'status_verifikasi' => collect(['pending', 'disetujui', 'ditolak'])->random(),
                'catatan_verifikasi' => null,
                'verified_by' => null,
                'verified_at' => null,
            ]);
        }
    }

    private function generateName(): string
    {
        $first = collect(['Ahmad', 'Muhammad', 'Abdul', 'Nur', 'Siti', 'Fatimah', 'Ali', 'Hasan', 'Husain', 'Aisyah',
            'Khalid', 'Umar', 'Zainab', 'Maimunah', 'Sa\'diyah', 'Mahmud', 'Ibrahim', 'Ismail', 'Yusuf', 'Aminah',
        ])->random();

        $last = collect(['Fauzi', 'Hidayat', 'Rahman', 'Syukur', 'Sholeh', 'Nashir', 'Karim', 'Aziz', 'Hakim', 'Malik',
            'Anwar', 'Bashir', 'Taqi', 'Siddiq', 'Amin', 'Kamil', 'Latif', 'Wahid', 'Zaki', 'Rois',
        ])->random();

        return "$first $last";
    }
}