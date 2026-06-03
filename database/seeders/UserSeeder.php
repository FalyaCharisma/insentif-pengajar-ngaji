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
        User::insert([
            [
                'name' => 'Super Admin',
                'email' => 'admin@gmail.com',
                'nik' => '1234567890123456',
                'password' => Hash::make('password'),
                'role_id' => 1,
            ],

            [
                'name' => 'Lembaga 1',
                'email' => 'lembaga1@gmail.com',
                'nik' => '2234567890123456',
                'password' => Hash::make('password'),
                'role_id' => 5,
            ],
        ]);
    }
}
