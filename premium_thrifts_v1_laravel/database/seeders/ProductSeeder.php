<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Premium Running Shoes',
                'description' => 'High-performance running shoes with cushioning technology',
                'price' => 129.99,
                'stock' => 50,
                'category' => 1,
                'subCategory' => 1,
                'brand' => 'Nike',
                'gender' => 'Unisex',
                'imageLink' => 'products/running-shoes.jpg',
                
            ],
            [
                'name' => 'Wireless Headphones',
                'description' => 'Noise-cancelling Bluetooth headphones',
                'price' => 199.99,
                'stock' => 30,
                'category' => 2,
                'subCategory' => 3,
                'brand' => 'Sony',
                'gender' => 'Unisex',
                'imageLink' => 'products/headphones.jpg',
                // 'is_active' => true
            ],
            // Add more products as needed
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // For larger datasets, use factory:
        Product::factory()->count(50)->create();
    }
}