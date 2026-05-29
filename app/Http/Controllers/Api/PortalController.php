<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\Pengurus;

class PortalController extends Controller
{
    public function statistik()
    {

        $totalLembaga = Lembaga::count();
        $totalPendidik = Pengurus::count();
        $totalTervalidasi = Pengurus::where('status_insentif', 'aktif')->count();
        $totalTidakTervalidasi = Pengurus::where('status_insentif', 'tidak_aktif')->count();

        $statistik = [
            ['label' => 'Total Lembaga', 'value' => $totalLembaga, 'icon' => 'Building2', 'tone' => 'success'],
            ['label' => 'Total Pendidik', 'value' => $totalPendidik, 'icon' => 'GraduationCap', 'tone' => 'primary'],
            ['label' => 'Tervalidasi', 'value' => $totalTervalidasi, 'icon' => 'CheckCircle2', 'tone' => 'success'],
            ['label' => 'Tidak Tervalidasi', 'value' => $totalTidakTervalidasi, 'icon' => 'XCircle', 'tone' => 'danger'],
        ];

        return response()->json([
            'success' => true,
            'data' => $statistik,
        ]);
    }

    public function layanan()
    {
        $layanan = [
            ['title' => 'Pengajuan Proposal', 'desc' => 'Usulan penerima insentif pendidik non formal.', 'icon' => 'HandCoins'],
            ['title' => 'Pengajuan Insentif', 'desc' => 'Usulan penerima insentif pendidik non formal.', 'icon' => 'HandCoins'],
        ];

        return response()->json([
            'success' => true,
            'data' => $layanan,
        ]);
    }

    public function quickLinks()
    {
        $quickLinks = [
            ['label' => 'Status Validasi', 'value' => 'Realtime', 'icon' => 'MonitorCheck'],
            ['label' => 'Legalitas Lembaga', 'value' => 'Terdata', 'icon' => 'Landmark'],
            ['label' => 'Berita Resmi', 'value' => 'Aktif', 'icon' => 'Newspaper'],
            ['label' => 'Bantuan Admin', 'value' => 'Siaga', 'icon' => 'Phone'],
        ];

        return response()->json([
            'success' => true,
            'data' => $quickLinks,
        ]);
    }
}
