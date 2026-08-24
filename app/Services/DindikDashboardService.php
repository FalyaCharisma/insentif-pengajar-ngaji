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
            'pengajarKecamatanChart' => $this->getPengajarKecamatanChart($periodeId),
            'pengajarWilayahChart' => $this->getPengajarWilayahChart(),
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

    private function getPengajarKecamatanChart(int $periodeId): array
    {
        // 1. Ambil semua profil lembaga dan kelompokkan berdasarkan kecamatan
        $profilLembaga = ProfilLembaga::select(
            'lembaga_id',
            'kecamatan'
        )
            ->whereNotNull('kecamatan')
            ->get()
            ->groupBy('kecamatan');

        $categories = [];
        $menerima = [];
        $tidakMenerima = [];

        // 2. Loop setiap kecamatan
        foreach ($profilLembaga as $kecamatan => $profils) {

            // Semua lembaga yang berada di kecamatan tersebut
            $lembagaIds = $profils
                ->pluck('lembaga_id')
                ->filter()
                ->unique()
                ->values();

            // 3. Ambil semua pengajar dari lembaga-lembaga tersebut
            $pengajarIds = Pengajar::whereIn(
                'lembaga_id',
                $lembagaIds
            )
                ->pluck('id');

            $totalPengajar = $pengajarIds->count();

            // 4. Hitung pengajar yang menerima insentif
            // pada periode yang dipilih
            $jumlahMenerima = PengajuanInsentif::whereIn(
                'pengajar_id',
                $pengajarIds
            )
                ->where('status', 'verified')
                ->whereHas('proposal', function ($query) use ($periodeId) {
                    $query->where('periode_id', $periodeId);
                })
                ->distinct('pengajar_id')
                ->count('pengajar_id');

            // 5. Yang tidak menerima = total pengajar - penerima
            $jumlahTidakMenerima =
                $totalPengajar - $jumlahMenerima;

            $categories[] = $kecamatan;
            $menerima[] = $jumlahMenerima;
            $tidakMenerima[] = $jumlahTidakMenerima;
        }

        return [
            'categories' => $categories,

            'series' => [
                [
                    'name' => 'Menerima',
                    'data' => $menerima,
                ],
                [
                    'name' => 'Tidak Menerima',
                    'data' => $tidakMenerima,
                ],
            ],
        ];
    }

    private function getPengajarWilayahChart(): array
    {
        $kotaKediri = Pengajar::where(
            'id_kabkota',
            '35.71'
        )->count();

        $luarKotaKediri = Pengajar::where(
            'id_kabkota',
            '!=',
            '35.71'
        )
            ->orWhereNull('id_kabkota')
            ->count();

        return [
            'labels' => [
                'Kota Kediri',
                'Luar Kota Kediri',
            ],

            'series' => [
                $kotaKediri,
                $luarKotaKediri,
            ],
        ];
    }
}