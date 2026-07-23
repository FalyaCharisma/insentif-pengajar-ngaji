<?php

namespace App\Services;

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
        $user = auth()->user();

        if ($user->hasRole('dindik')) {
            return $this->dindik->index();
        }

        if ($user->hasRole('forum')) {
            return $this->forum->index();
        }

        if ($user->hasRole('lembaga')) {
            return $this->lembaga->index();
        }

        return $this->superadmin->index();
    }
}