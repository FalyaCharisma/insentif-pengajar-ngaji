<?php

namespace App\Policies;

use App\Models\Lembaga;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LembagaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Lembaga $lembaga): bool
    {
        if ($user->hasRole('superadmin')) {
            return true;
        }

        if ($user->hasRole('dindik')) {
            return true;
        }

        if ($user->hasRole('forum')) {
            return $user->forum &&
                   $lembaga->forum_id === $user->forum->id;
        }

        if ($user->hasRole('lembaga')) {
            return $lembaga->user_id === $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Lembaga $lembaga): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Lembaga $lembaga): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Lembaga $lembaga): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Lembaga $lembaga): bool
    {
        return false;
    }
}
