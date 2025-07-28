<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    // Define the model this factory is for
    protected $model = \App\Models\User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'google_id' => $this->faker->optional()->uuid(), // optional Google ID as UUID
            'password' => Hash::make('password'), // default password for all users
            'guest_token' => $this->faker->optional()->uuid(), // optional guest token as UUID
            'phone' => $this->faker->optional()->phoneNumber(),
            'is_subscribed' => $this->faker->boolean(30), // 30% chance of being subscribed
            'role' => $this->faker->randomElement(['user', 'admin', 'guest']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the user is a guest (no password, with guest token).
     */
    public function guest()
    {
        return $this->state(function (array $attributes) {
            return [
                'password' => null,
                'guest_token' => $this->faker->uuid(),
                'role' => 'guest',
            ];
        });
    }
}
