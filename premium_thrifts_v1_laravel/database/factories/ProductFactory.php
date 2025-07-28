<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->unique()->words(3, true),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 500),
            'stock' => $this->faker->numberBetween(0, 100),
            'category_id' => $this->faker->numberBetween(1, 5),
            'sub_category_id' => $this->faker->numberBetween(1, 10),
            'brand' => $this->faker->randomElement(['Nike', 'Adidas', 'Sony', 'Apple', 'Samsung']),
            'gender' => $this->faker->randomElement(['Men', 'Women', 'Unisex']),
            'image_url' => 'products/' . $this->faker->image('public/storage/products', 640, 480, null, false),
            'is_active' => $this->faker->boolean(90) // 90% chance of being active
        ];
    }
}