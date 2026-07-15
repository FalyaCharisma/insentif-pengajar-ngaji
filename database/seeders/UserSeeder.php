<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        // Superadmin
        $superadmin = User::updateOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'name' => 'Super Administrator',
                'username' => 'superadmin',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $superadmin->assignRole('superadmin');

        // Dindik
        $dindik = User::updateOrCreate(
            ['email' => 'dindik@gmail.com'],
            [
                'name' => 'Admin Dindik',
                'username' => 'dindik',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $dindik->assignRole('dindik');

        // Forum
        $forum = User::updateOrCreate(
            ['email' => 'forum@gmail.com'],
            [
                'name' => 'Admin Forum',
                'username' => 'forum',
                'password' => Hash::make('password'),
                'status' => 'aktif',
                'force_change_password' => false,
            ]
        );

        $forum->assignRole('forum');
    }
}
