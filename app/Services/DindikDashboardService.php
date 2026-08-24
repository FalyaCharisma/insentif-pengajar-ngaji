<?php

namespace App\Services;
use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use App\Models\KategoriLembaga;
use App\Models\Pengajar;
use App\Models\Forum;
use App\Models\Siswa;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;
use App\Models\Periode;
use Illuminate\Support\Facades\DB;

class DindikDashboardService
{
    public function index(int $periodeId): array
    {
        $data = [
            'statistics' => $this->getStatistics($periodeId),
            'proposalSummary' => $this->getProposalSummary($periodeId),
            'chart' => $this->getProposalChart(),
            
            'kategoriChart'    => $this->getKategoriChart(),
            'kecamatanChart'   => $this->getKecamatanChart(),
        ];

        return $data;
    }

    private function getStatistics(int $periodeId): array
    {
        return [
            // MASTER
            'total_forum'       => Forum::count(),

            'total_lembaga'     => Lembaga::count(),

            'verified_lembaga'  => ProfilLembaga::where(
                'status_verifikasi',
                'disetujui'
            )->count(),

            'pending_lembaga'   => ProfilLembaga::where(
                'status_verifikasi',
                'pending'
            )->count(),

            'total_pengajar'    => Pengajar::count(),

            'verified_pengajar' => Pengajar::where(
                'status_verifikasi',
                'disetujui'
            )->count(),

            'pending_pengajar'  => Pengajar::where(
                'status_verifikasi',
                'pending'
            )->count(),

            // TRANSAKSI
            'total_siswa' => Siswa::where(
                'periode_id',
                $periodeId
            )->sum('jumlah_siswa'),

            'total_proposal' => PengajuanProposal::where(
                'periode_id',
                $periodeId
            )->count(),

            'total_pengajuan' => PengajuanInsentif::whereHas(
                'proposal',
                fn ($q) => $q->where('periode_id', $periodeId)
            )->count(),
        ];
    }

    private function getProposalSummary(int $periodeId): array
    {
        $proposal = PengajuanProposal::where(
            'periode_id',
            $periodeId
        )->count();

        $verified = PengajuanProposal::where(
            'periode_id',
            $periodeId
        )->where('status', 'verified')->count();

        $pending = PengajuanProposal::where(
            'periode_id',
            $periodeId
        )->where('status', 'pending')->count();

        $revision = PengajuanProposal::where(
            'periode_id',
            $periodeId
        )->where('status', 'revision')->count();

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

    private function getKecamatanChart(): array
    {
        $data = ProfilLembaga::selectRaw("
                kecamatan,
                COUNT(*) as total
            ")
            ->groupBy('kecamatan')
            ->orderByDesc('total')
            ->get();

        return [
            'categories' => $data->pluck('kecamatan')->toArray(),

            'series' => [
                [
                    'name' => 'Jumlah Lembaga',
                    'data' => $data->pluck('total')->toArray(),
                ],
            ],
        ];
    }
}