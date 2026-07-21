<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Halaman Pengaturan Akun
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->getRoleNames()->first(),
                'force_change_password' => $user->force_change_password,
            ],
        ]);
    }

    /**
     * Update informasi akun
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return back()->with(
            'success',
            'Profil berhasil diperbarui.'
        );
    }
}