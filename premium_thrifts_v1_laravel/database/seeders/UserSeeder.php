<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run()
    {
        // Create 20 users using the User factory
        User::factory()->count(10)->create();

        // Optional: Create a guest user explicitly
        User::factory()->guest()->create();
    }
}
