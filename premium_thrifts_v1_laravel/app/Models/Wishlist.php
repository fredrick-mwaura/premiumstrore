<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\WishlistItem;
use App\Models\User;

class Wishlist extends Model
{
    use HasFactory;

    public function Product()
    {
        return $this->belongsTo(Product::class);
    }

    public function items()
    {
        return $this->hasMany(WishlistItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
