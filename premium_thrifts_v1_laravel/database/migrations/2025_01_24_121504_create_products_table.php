<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(1);
            $table->foreignId('category_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('subCategory_id')->constrained()->onDelete('CASCADE');
            $table->string('slug')->unique()->nullable(false);            
            $table->string('category')->nullable();
            $table->string('subCategory')->nullable();
            $table->string('brand')->nullable();
            $table->string('gender')->nullable();
            $table->string('imageLink')->nullable();
            $table->json('images')->nullable();
            $table->json('color')->nullable();
            $table->json('size')->nullable();
            $table->json('material')->nullable();
            $table->timestamps();

            $table->foreign('category')->references('id')->on('category')->onDelete('SET NULL');
            $table->foreign('subCategory')->references('id')->on('subCategory')->onDelete('SET NULL');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
