<?php

namespace App\Policies;

use App\Models\PengajuanProposal;
use App\Models\User;

class PengajuanProposalPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole([
            'superadmin',
            'dindik',
            'forum',
            'lembaga'
        ]);
    }

    public function view(User $user, PengajuanProposal $proposal): bool
    {
        if ($user->hasAnyRole(['superadmin', 'dindik'])) {
            return true;
        }

        if ($user->hasRole('lembaga')) {
            return $proposal->lembaga_id == $user->lembaga?->id;
        }

        if ($user->hasRole('forum')) {
            return $proposal->lembaga->forum_id == $user->forum?->id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('lembaga');
    }

    public function update(User $user, PengajuanProposal $proposal): bool
    {
        if ($user->hasAnyRole(['superadmin', 'dindik'])) {
            return true;
        }

        return $user->hasRole('lembaga')
            && $proposal->lembaga_id == $user->lembaga?->id;
    }

    public function delete(User $user, PengajuanProposal $proposal): bool
    {
        if ($user->hasAnyRole(['superadmin', 'dindik'])) {
            return true;
        }

        return $user->hasRole('lembaga')
            && $proposal->lembaga_id == $user->lembaga?->id;
    }

    public function verify(User $user, PengajuanProposal $proposal): bool
    {
        return $user->hasRole('forum')
            && $proposal->lembaga->forum_id == $user->forum?->id;
    }
}