<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\Pengurus;

class KecamatanController extends Controller
{
    public function index()
    {
        $kecamatanList = [
            [
                'id'    => 'mojoroto',
                'name'  => 'Mojoroto',
                'path'  => 'M95,45 C60,55 42,82 45,122 C48,164 76,192 114,205 C126,176 130,143 124,113 C118,82 120,60 95,45 Z',
                'label' => ['x' => 80, 'y' => 128],
            ],
            [
                'id'    => 'kota',
                'name'  => 'Kota',
                'path'  => 'M95,45 C60,55 42,82 45,122 C48,164 76,192 114,205 C126,176 130,143 124,113 C118,82 120,60 95,45 Z',
                'label' => ['x' => 80, 'y' => 128],
            ],
            [
                'id'    => 'pesantren',
                'name'  => 'Pesantren',
                'path'  => 'M95,45 C60,55 42,82 45,122 C48,164 76,192 114,205 C126,176 130,143 124,113 C118,82 120,60 95,45 Z',
                'label' => ['x' => 80, 'y' => 128],
            ],
        ];

        $kecamatanData = collect($kecamatanList)->map(function ($kec) {
            $name = $kec['name'];

            $pendidikQuery = fn() => Pengurus::whereHas('lembaga', fn($q) => $q->where('kecamatan', $name));

            return array_merge($kec, [
                'stats' => [
                    'lembaga'           => Lembaga::where('kecamatan', $name)->count(),
                    'pendidik'          => $pendidikQuery()->count(),
                    'tervalidasi'       => $pendidikQuery()->where('status_insentif', 'aktif')->count(),
                    'tidak_tervalidasi' => $pendidikQuery()->where('status_insentif', 'nonaktif')->count(),
                ],
                'lembaga' => Lembaga::with('kategori', 'pengurus')->where('kecamatan', $name)->get(),
            ]);
        });

        return response()->json(
            [
                'success' => true,
                'data' => $kecamatanData
            ]
        );
    }

    public function show($id)
    {
        $kecamatanData = $this->getAllData();
        $kecamatan = collect($kecamatanData)->firstWhere('id', $id);

        if (!$kecamatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kecamatan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $kecamatan,
        ]);
    }

    public function lembaga($id)
    {
        $kecamatanData = $this->getAllData();
        $kecamatan = collect($kecamatanData)->firstWhere('id', $id);

        if (!$kecamatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kecamatan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $kecamatan['lembaga'],
        ]);
    }

    public function lembagaDetail($kecamatanId, $lembagaId)
    {
        $kecamatanData = $this->getAllData();
        $kecamatan = collect($kecamatanData)->firstWhere('id', $kecamatanId);

        if (!$kecamatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kecamatan tidak ditemukan',
            ], 404);
        }

        $lembaga = collect($kecamatan['lembaga'])->firstWhere('id', $lembagaId);

        if (!$lembaga) {
            return response()->json([
                'success' => false,
                'message' => 'Lembaga tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $lembaga,
        ]);
    }

    private function getAllData()
    {
        return $this->index();
    }
}
