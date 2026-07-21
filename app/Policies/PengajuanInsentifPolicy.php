<?php

namespace App\Policies;

use App\Models\PengajuanInsentif;
use App\Models\User;

class PengajuanInsentifPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole([
            'superadmin',
            'dindik',
            'forum',
            'lembaga',
        ]);
    }

    public function view(User $user, PengajuanInsentif $pengajuan): bool
    {
        if ($user->hasRole(['superadmin', 'dindik'])) {
            return true;
        }

        if ($user->hasRole('forum')) {
            return optional($user->forum)->id === optional($pengajuan->proposal->lembaga)->forum_id;
        }

        if ($user->hasRole('lembaga')) {
            return optional($user->lembaga)->id === $pengajuan->proposal->lembaga_id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('lembaga');
    }

    public function update(User $user, PengajuanInsentif $pengajuan): bool
    {
        return $user->hasRole('lembaga')
            && optional($user->lembaga)->id === $pengajuan->proposal->lembaga_id
            && $pengajuan->status === 'pending';
    }

    public function delete(User $user, PengajuanInsentif $pengajuan): bool
    {
        return $this->update($user, $pengajuan);
    }

    public function verify(User $user, PengajuanInsentif $pengajuan): bool
    {
        return $user->hasRole('forum')
            && optional($user->forum)->id === optional($pengajuan->proposal->lembaga)->forum_id;
    }
}