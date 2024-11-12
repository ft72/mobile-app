<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MobileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [UserController::class, 'welcome'])->name('welcome');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/shops', [ShopController::class, 'index'])->name('shops');
    Route::get('/shops/create', [ShopController::class, 'create'])->name('shops.create');
    Route::get('/shops/edit', [ShopController::class, 'update'])->name('shops.edit');
    Route::post('/shop/create', [ShopController::class, 'store'])->name('shops.store');
    Route::post('/shop/edit', [ShopController::class, 'update'])->name('shops.update');
    Route::post('/shop/destroy', [ShopController::class, 'destroy'])->name('shops.destroy');


    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('/mobiles', [MobileController::class, 'index'])->name('mobiles');
    Route::get('/mobiles/create', [MobileController::class, 'create'])->name('mobiles.create');
    Route::post('/mobiles', [MobileController::class, 'store'])->name('mobiles.store');
    Route::post('/mobiles/{id}/edit', [MobileController::class, 'edit'])->name('mobiles.edit');
    Route::post('/mobiles/{id}/delete', [MobileController::class, 'destroy'])->name('mobiles.destroy');

    Route::get('/accessories', [ShopController::class, 'index'])->name('accessories');
    Route::get('/accessories/create', [ShopController::class, 'create'])->name('accessories.create');
    Route::post('/accessories/create', [ShopController::class, 'store'])->name('accessories.store');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/customers/create', [CustomerController::class, 'store'])->name('customers.store');

});

require __DIR__ . '/auth.php';
