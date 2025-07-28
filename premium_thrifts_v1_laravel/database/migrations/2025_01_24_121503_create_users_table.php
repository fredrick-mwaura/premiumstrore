<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('google_id')->nullable()->unique();
            $table->string('password');
            $table->string('guest_token')->nullable()->unique()->index();
            $table->string('phone')->nullable();
            $table->dateTime('email_verified_at')->default(null);
            $table->boolean('is_verified')->default(0);
            $table->boolean('is_subscribed')->default(0);  
            $table->boolean('status')->default(1);          
            $table->enum('role', ['customer', 'admin'])->default('customer');
            $table->timestamps();
            
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
