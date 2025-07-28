<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street', 
        'county', 
        'postal_code', 
        'phone_number',
        'user_id'
    ];

    protected $casts = [ 'phone_number' => 'array' ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
