<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'phone' => '+12345678901', // Ensure unique phone number
                'password' => Hash::make('password'), // Use a secure password
                'user_type' => 'admin',
                'verified' => 'verified',
                'email_verified_at' => now(),
            ]);
        }
    }
}
