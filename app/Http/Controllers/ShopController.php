<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\shop;

class ShopController extends Controller
{
    public function create()
    {
        return Inertia::render('Shop/CreateShop');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shops',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255|unique:shops',
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

    public function index()
    {
        // Retrieve shops belonging to the authenticated user
        $shops = Shop::where('user_id', auth()->user()->id)->get();

        return Inertia::render('Shop/Index', [
            'shops' => $shops,
        ]);
    }
}
