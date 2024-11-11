<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessoriesTable extends Migration
{
    public function up()
    {
        Schema::create('accessories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade'); // Related shop
            $table->string('type'); // e.g., case, charger
            $table->string('brand')->nullable();
            $table->string('compatibility')->nullable(); // Compatible devices
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->enum('stock_status', ['in_stock', 'sold', 'reserved'])->default('in_stock');
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null'); // Sold reference
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('accessories');
    }
}