<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('contact')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Owner of the shop
            $table->string('shop_id')->unique(); // Unique identifier for each shop
            $table->text('description')->nullable();
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->json('opening_hours')->nullable(); // e.g., {"Mon-Fri": "9:00-18:00", "Sat": "10:00-16:00"}
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
