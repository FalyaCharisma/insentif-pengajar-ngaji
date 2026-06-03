<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = [
            [
                'id' => 1,
                'title' => 'Pendataan Penerima Insentif Pendidik Non Formal Dibuka',
                'date' => '25 Mei 2026',
                'category' => 'Pengumuman',
                'excerpt' => 'Dinas Pendidikan Kota Kediri membuka periode verifikasi data lembaga dan pendidik non formal tahun berjalan.',
            ],
            [
                'id' => 2,
                'title' => 'Sosialisasi Validasi Data Lembaga Pendidikan Non Formal',
                'date' => '22 Mei 2026',
                'category' => 'Berita',
                'excerpt' => 'Kegiatan sosialisasi dilaksanakan untuk meningkatkan ketepatan data penerima bantuan dan insentif.',
            ],
            [
                'id' => 3,
                'title' => 'Integrasi Layanan Digital Pendidikan Kota Kediri',
                'date' => '18 Mei 2026',
                'category' => 'Info Layanan',
                'excerpt' => 'Portal ini disiapkan sebagai pusat informasi, layanan, dan monitoring program pendidikan masyarakat.',
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $berita,
        ]);
    }

    public function show($id)
    {
        $allBerita = [
            [
                'id' => 1,
                'title' => 'Pendataan Penerima Insentif Pendidik Non Formal Dibuka',
                'date' => '25 Mei 2026',
                'category' => 'Pengumuman',
                'excerpt' => 'Dinas Pendidikan Kota Kediri membuka periode verifikasi data lembaga dan pendidik non formal tahun berjalan.',
            ],
            [
                'id' => 2,
                'title' => 'Sosialisasi Validasi Data Lembaga Pendidikan Non Formal',
                'date' => '22 Mei 2026',
                'category' => 'Berita',
                'excerpt' => 'Kegiatan sosialisasi dilaksanakan untuk meningkatkan ketepatan data penerima bantuan dan insentif.',
            ],
            [
                'id' => 3,
                'title' => 'Integrasi Layanan Digital Pendidikan Kota Kediri',
                'date' => '18 Mei 2026',
                'category' => 'Info Layanan',
                'excerpt' => 'Portal ini disiapkan sebagai pusat informasi, layanan, dan monitoring program pendidikan masyarakat.',
            ],
        ];

        $berita = collect($allBerita)->firstWhere('id', $id);

        if (!$berita) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $berita,
        ]);
    }
}
