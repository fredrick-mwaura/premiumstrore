<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Wishlist;

class WishlistItem extends Model
{
    use HasFactory;

    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);        
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
