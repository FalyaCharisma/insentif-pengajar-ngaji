<?php

namespace App\Services;
use App\Models\Periode;

class DashboardService
{
    public function __construct(
        protected DindikDashboardService $dindik,
        protected ForumDashboardService $forum,
        protected LembagaDashboardService $lembaga,
        protected SuperadminDashboardService $superadmin,
    ) {}

    public function index(): array
    {
        $selectedPeriode = request()->integer('periode_id')
            ?: Periode::where('status', true)->value('id');

        $user = auth()->user();

        $data = match (true) {
            $user->hasRole('dindik') => $this->dindik->index($selectedPeriode),
            $user->hasRole('forum') => $this->forum->index($selectedPeriode),
            $user->hasRole('lembaga') => $this->lembaga->index($selectedPeriode),
            default => $this->superadmin->index($selectedPeriode),
        };

        return array_merge($data, [
            'periode' => Periode::orderByDesc('tahun')->get(),
            'selectedPeriode' => $selectedPeriode,
        ]);

    }
}