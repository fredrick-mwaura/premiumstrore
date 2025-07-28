<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('CASCADE');
            $table->enum('payment_method', ['credit_card', 'paypal', 'bank_transfer', 'm-pesa']);
            $table->string('account_details')->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->boolean('active')->default(1);
            $table->foreignId('order_id')->constrained()->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}

