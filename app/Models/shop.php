<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\mobile;

class shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'contact',
        'user_id',
        'shop_id',
        'description',
        'status',
        'opening_hours'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mobiles()
    {
        return $this->hasMany(mobile::class);
    }

    public function accessories()
    {
        return $this->hasMany(Accessory::class);
    }
}