<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Administrator
        $superadmin = User::updateOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'name' => 'Super Administrator',
                'kode' => 'SUPERADMIN',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $superadmin->assignRole('superadmin');

        // Admin Dindik
        $dindik = User::updateOrCreate(
            ['email' => 'dindik@gmail.com'],
            [
                'name' => 'Admin Dindik',
                'kode' => 'DINDIK',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $dindik->assignRole('dindik');

        // Admin Forum
        $forum = User::updateOrCreate(
            ['email' => 'forum@gmail.com'],
            [
                'name' => 'Admin Forum',
                'kode' => 'FORUM',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $forum->assignRole('forum');
    }
}