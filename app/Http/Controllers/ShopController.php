<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    public function create()
    {
        return Inertia::render('Shop/CreateShop');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $request->user()->shops()->create([
            'name' => $request->name,
            'address' => $request->address,
            'contact' => $request->contact,
            'description' => $request->description,
            'shop_id' => uniqid(), 
        ]);

        return redirect()->route('dashboard')->with('success', 'Shop created successfully.');
    }
}
