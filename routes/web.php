<?php

use App\Http\Controllers\MobileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [UserController::class, 'welcome'])->name('welcome');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('/mobiles/create', [MobileController::class, 'create'])->name('mobiles.create');
    Route::get('/mobiles', [MobileController::class, 'index'])->name('mobiles');
    Route::post('/mobiles', [MobileController::class, 'store'])->name('mobiles.store');
});



Route::middleware(['auth'] )->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/shops', [ShopController::class, 'index'])->name('shops');
    Route::get('/shops/create', [ShopController::class, 'create'])->name('shops.create');
    Route::post('/shop/create', [ShopController::class, 'store'])->name('shops.store');

    Route::get('/accessories', [ShopController::class, 'index'])->name('accessories');
    Route::get('/accessories/create', [ShopController::class, 'create'])->name('accessories.create');
    Route::post('/accessories/create', [ShopController::class, 'store'])->name('accessories.store');

});

require __DIR__ . '/auth.php';
