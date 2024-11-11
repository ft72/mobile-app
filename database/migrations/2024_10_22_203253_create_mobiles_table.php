<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobilesTable extends Migration
{
    public function up()
    {
        Schema::create('mobiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id'); // unsignedBigInteger
            $table->string('brand');
            $table->string('model');
            $table->string('imei')->unique();
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->enum('stock_status', ['in_stock', 'sold', 'reserved'])->default('in_stock');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->timestamps();
        
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mobiles');
    }
}