<?php

namespace App\Http\Controllers;

use App\Models\Mobile;
use App\Models\shop;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MobileController extends Controller
{
    public function create()
    {
        \Log::info(shop::where('user_id', auth()->user()->id)->get());
        $shops = shop::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Mobile/CreateMobile', [
            'shops' => $shops
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "shop_id" => 'required|exists:shops,id',
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'imei' => 'string|unique:mobiles,imei|max:15',
            'sku' => 'string|unique:mobiles,sku|max:100',
            'price' => 'required|numeric|min:0',
            'stock_status' => 'required|in:in_stock,sold,reserved',
        ]);

        Mobile::create([
            'shop_id' => $request->shop_id,
            'brand' => $request->brand,
            'model' => $request->model,
            'imei' => $request->imei,
            'imei2' => $request->imei2,
            'sku' => $request->sku,
            'price' => $request->price,
            'stock_status' => $request->stock_status,
        ]);

        return redirect()->route('dashboard')->with('success', 'Mobile added successfully.');
    }

    public function index()
    {
        $shops = shop::where('user_id', auth()->user()->id)->get();
        
        if ($shops->isEmpty()) {
            return Inertia::render('Mobile/Mobiles', [
                'mobiles' => [],
                'shops' => []
            ]);
        }

        foreach ($shops as $shop) {
            $mobiles[] = $shop->mobiles->groupBy('shop_id')->toArray();
        }




        return Inertia::render('Mobile/Mobiles', [
            'mobiles' => $mobiles ?: [],
            'shops' => $shops ?: []
        ]);
    }
}
