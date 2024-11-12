<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'total_price',
        'status',
        'shop_id'
    ];

    /**
     * Get the customer that owns the order.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the shop that owns the order.
     */
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    /**
     * The mobiles that belong to the order.
     */
    public function mobiles()
    {
        return $this->belongsToMany(Mobile::class, 'order_mobile')->withTimestamps();
    }

    /**
     * The accessories that belong to the order.
     */
    public function accessories()
    {
        return $this->belongsToMany(Accessory::class, 'order_accessory')->withTimestamps();
    }
}