<?php

namespace App\Services;

use App\Models\Forum;
use App\Models\Lembaga;
use App\Models\Pengajar;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;
use App\Models\Kuota;
use Illuminate\Database\Eloquent\Builder;

class ForumDashboardService
{
    private ?Forum $forum = null;

    public function index(?int $selectedPeriode = null): array
    {
        $this->forum = Forum::where('user_id', auth()->id())->first();

        return [
            'lembagaSummary' => $this->getLembagaSummary(),
            'pengajarSummary' => $this->getPengajarSummary(),
            'proposalSummary' => $this->getProposalSummary($selectedPeriode),
            'insentifSummary' => $this->getInsentifSummary($selectedPeriode),
            'insentifProgress' => $this->getInsentifProgress($selectedPeriode),

            // Chart
            'kategoriChart' => $this->getKategoriChart(),
            'pengajarLembagaChart' => $this->getPengajarLembagaChart(),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY LEMBAGA
    |--------------------------------------------------------------------------
    */

    private function lembagaQuery(): Builder
    {
        $query = Lembaga::query();
        if (!$this->forum) {
            return $query->whereRaw('1 = 0');
        }
        return $query->where('forum_id', $this->forum->id);
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY PENGAJAR
    |--------------------------------------------------------------------------
    */

    private function pengajarQuery(): Builder
    {
        $query = Pengajar::query();
        if (!$this->forum) {
            return $query->whereRaw('1 = 0');
        }
        return $query->whereHas('lembaga', function ($q) {
            $q->where('forum_id', $this->forum->id);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY PROPOSAL
    |--------------------------------------------------------------------------
    */

    private function proposalQuery(?int $periodeId = null): Builder
    {
        $query = PengajuanProposal::query();
        if (!$this->forum) {
            return $query->whereRaw('1 = 0');
        }
        $query->whereHas('lembaga', function ($q) {
            $q->where('forum_id', $this->forum->id);
        });

        if ($periodeId) {
            $query->where('periode_id', $periodeId);
        }

        return $query;
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY PENGAJUAN INSENTIF
    |--------------------------------------------------------------------------
    */

    private function insentifQuery(?int $periodeId = null): Builder
    {
        $query = PengajuanInsentif::query();
        if (!$this->forum) {
            return $query->whereRaw('1 = 0');
        }
        $query->whereHas('proposal.lembaga', function ($q) {
            $q->where('forum_id', $this->forum->id);
        });

        if ($periodeId) {
            $query->whereHas('proposal', function ($q) use ($periodeId) {
                $q->where('periode_id', $periodeId);
            });
        }

        return $query;
    }

    /*
    |--------------------------------------------------------------------------
    | SUMMARY LEMBAGA
    |--------------------------------------------------------------------------
    */

    private function getLembagaSummary(): array
    {
        $query = $this->lembagaQuery();
        $total = (clone $query)->count();
        $verified = (clone $query)
            ->whereHas('profil', function ($q) {
                $q->where('status_verifikasi', 'disetujui');
            })
            ->count();

        $pending = (clone $query)
            ->whereHas('profil', function ($q) {
                $q->where('status_verifikasi', 'pending');
            })
            ->count();

        return [
            'total' => $total,
            'verified' => $verified,
            'pending' => $pending,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | SUMMARY PENGAJAR
    |--------------------------------------------------------------------------
    */

    private function getPengajarSummary(): array
    {
        $query = $this->pengajarQuery();
        $total = (clone $query)->count();
        $verified = (clone $query)->where('status_verifikasi', 'disetujui')->count();
        $pending = (clone $query)->where('status_verifikasi', 'pending')->count();

        return [
            'total' => $total,
            'verified' => $verified,
            'pending' => $pending,

            'progress' => $total > 0 ? round(($verified / $total) * 100) : 0,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | SUMMARY PROPOSAL
    |--------------------------------------------------------------------------
    */

    private function getProposalSummary(?int $periodeId): array
    {
        $query = $this->proposalQuery($periodeId);
        $total = (clone $query)->count();
        $verified = (clone $query)->where('status', 'verified')->count();
        $pending = (clone $query)->where('status', 'pending')->count();

        return [
            'total' => $total,
            'verified' => $verified,
            'pending' => $pending,
            'progress' => $total > 0 ? round(($verified / $total) * 100) : 0,
        ];
    }
    private function kuotaQuery(?int $periodeId = null): Builder
    {
        $query = Kuota::query();

        if (!$this->forum) {
            return $query->whereRaw('1 = 0');
        }

        $query->whereHas('lembaga', function ($q) {
            $q->where('forum_id', $this->forum->id);
        });

        if ($periodeId) {
            $query->where('periode_id', $periodeId);
        }

        return $query;
    }
    private function getInsentifProgress(?int $periodeId): array
    {
        $totalKuota = (int) $this->kuotaQuery($periodeId)->sum('kuota_final');
        $dipilih = $this->insentifQuery($periodeId)->count();
        $sisaKuota = max($totalKuota - $dipilih, 0);
        $progress = $totalKuota > 0 ? round(($dipilih / $totalKuota) * 100) : 0;
        // Jaga agar progress tidak melebihi 100%
        $progress = min($progress, 100);

        return [
            'total_kuota' => $totalKuota,
            'dipilih' => $dipilih,
            'sisa_kuota' => $sisaKuota,
            'progress' => $progress,
        ];
    }
    private function getInsentifSummary(?int $periodeId): array
    {
        $query = $this->insentifQuery($periodeId);
        $total = (clone $query)->count();
        $verified = (clone $query)->where('status', 'verified')->count();
        $pending = (clone $query)->where('status', 'pending')->count();

        return [
            'total' => $total,
            'verified' => $verified,
            'pending' => $pending,
        ];
    }
    private function getKategoriChart(): array
    {
        $data = $this->lembagaQuery()
            ->with('kategori')
            ->get()
            ->groupBy(function ($lembaga) {
                return $lembaga->kategori?->nama ?? 'Tanpa Kategori';
            })
            ->map(function ($items) {
                return $items->count();
            });

        return [
            'labels' => $data->keys()->values()->toArray(),
            'series' => $data->values()->toArray(),
        ];
    }
    private function getPengajarLembagaChart(): array
    {
        $data = $this->lembagaQuery()->withCount('pengurus')->orderByDesc('pengurus_count')->get();

        return [
            'categories' => $data->pluck('nama')->values()->toArray(),

            'series' => [
                [
                    'name' => 'Pengajar',
                    'data' => $data->pluck('pengurus_count')->values()->toArray(),
                ],
            ],
        ];
    }
}
