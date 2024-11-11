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
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function mobiles()
    {
        return $this->belongsToMany(Mobile::class, 'order_mobile')->withTimestamps();
    }

    public function accessories()
    {
        return $this->belongsToMany(Accessory::class, 'order_accessory')->withTimestamps();
    }
}