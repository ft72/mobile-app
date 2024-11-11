<?php

namespace App\Http\Controllers;

use App\Models\shop;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $shops = shop::where('user_id', auth()->user()->id)->get();

        return Inertia::render('Dashboard', [
            "shops" => $shops ?: null
        ]);
    }

    public function welcome()
    {
        $user = User::find(auth()->user());
        \Log::info($user);
        return Inertia::render('Welcome', [
            "user" => $user ?: null
        ]);
    }
}
