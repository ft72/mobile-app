<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mobile extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'brand',
        'model',
        'imei',
        'imei2',
        'sku',
        'price',
        'stock_status',
        'order_id',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}