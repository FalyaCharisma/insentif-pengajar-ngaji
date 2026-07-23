<?php

namespace App\Services;
use App\Models\Lembaga;
use App\Models\Pengajar;
use App\Models\Forum;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;

class DindikDashboardService
{
    public function index(): array
    {
        $data = [
            'statistics' => $this->getStatistics(),
            'chart' => [],
            'activities' => [],
        ];

        return $data;
    }

    private function getStatistics(): array
    {
        return [
            'total_lembaga'          => Lembaga::count(),
            'total_pengajar'         => Pengajar::count(),
            'total_proposal'         => PengajuanProposal::count(),
            'total_pengajuan'        => PengajuanInsentif::count(),
            'total_forum'            => Forum::count()
        ];
    }
}