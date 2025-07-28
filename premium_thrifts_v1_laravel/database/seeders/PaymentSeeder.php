<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PaymentSeeder extends Seeder
{
    public function run()
    {
        DB::table('payments')->insert([
            [
                'order_id' => 1, // Make sure this order exists in your database
                'payment_method' => 'credit_card',
                'account_details' => 'Visa ending in 4242',
                'payment_date' => Carbon::now()->subDays(2),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'payment_method' => 'paypal',
                'account_details' => 'paypal_user@example.com',
                'payment_date' => Carbon::now()->subDay(),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'payment_method' => 'm-pesa',
                'account_details' => '254712345678',
                'payment_date' => Carbon::now(),
                'active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}