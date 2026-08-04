<?php

namespace App\Services;
use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use App\Models\Pengajar;
use App\Models\Forum;
use App\Models\Siswa;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;
use App\Models\Periode;
use Illuminate\Support\Facades\DB;

class DindikDashboardService
{
    public function index(): array
    {
        $data = [
            'statistics' => $this->getStatistics(),
            'proposalSummary' => $this->getProposalSummary(),
            'chart' => $this->getProposalChart(),
            'activities' => [],
        ];

        return $data;
    }

    private function getStatistics(): array
    {
        return [
            'total_forum'            => Forum::count(),
            'total_lembaga'          => Lembaga::count(),
            'verified_lembaga'       => ProfilLembaga::where('status_verifikasi', 'disetujui')->count(),
            'pending_lembaga'        => ProfilLembaga::where('status_verifikasi', 'pending')->count(),
            'total_pengajar'         => Pengajar::count(),
            'verified_pengajar'      => Pengajar::where('status_verifikasi', 'disetujui')->count(),
            'pending_pengajar'       => Pengajar::where('status_verifikasi', 'pending')->count(),
            'total_siswa'            => Siswa::count(),
            'total_proposal'         => PengajuanProposal::count(),
            'total_pengajuan'        => PengajuanInsentif::count(),
        ];
    }

    private function getProposalSummary(): array
    {
        $proposal = PengajuanProposal::count();

        $verified = PengajuanProposal::where('status', 'verified')->count();

        $pending = PengajuanProposal::where('status', 'pending')->count();

        $revision = PengajuanProposal::where('status', 'revision')->count();

        // dd($proposal, $verified, $pending, $revision);
        return [
            'proposal' => $proposal,
            'verified' => $verified,
            'pending' => $pending,
            'revision' => $revision,
            'progress' => $proposal > 0
                ? round(($verified / $proposal) * 100)
                : 0,
        ];
    }

    private function getProposalChart(): array
    {
        $periodes = Periode::orderByDesc('tahun')
            ->take(5)
            ->get()
            ->sortBy('tahun')
            ->values();

        $categories = [];
        $proposalData = [];
        $verifiedData = [];

        foreach ($periodes as $periode) {

            $categories[] = $periode->tahun;

            $proposalData[] = PengajuanProposal::where(
                'periode_id',
                $periode->id
            )->count();

            $verifiedData[] = PengajuanProposal::where(
                'periode_id',
                $periode->id
            )
            ->where('status', 'verified')
            ->count();
        }

        return [
            'categories' => $categories,

            'series' => [
                [
                    'name' => 'Proposal Masuk',
                    'data' => $proposalData,
                ],

                [
                    'name' => 'Terverifikasi',
                    'data' => $verifiedData,
                ],
            ],
        ];
    }

    private function getKategoriChart(): array
    {
        $data = KategoriLembaga::withCount('lembaga')
            ->orderBy('nama')
            ->get();

        return [
            'labels' => $data->pluck('nama')->toArray(),
            'series' => $data->pluck('lembaga_count')->toArray(),
        ];
    }
}