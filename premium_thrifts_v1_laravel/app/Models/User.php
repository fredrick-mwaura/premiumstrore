<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
use App\Models\{Address, CartItem };

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function Address()
    {
        return $this->hasMany(Address::class);
    }

    public static function findOrcreateGoogle ($googleUser)
    {
        $user = self::where('google_id', $googleUser->id->first());

        $isNewUser = false;
        if(!$user){
             $user = self::create([
            'name' => $googleUser->name ?? $googleUser->nickname ?? 'Unknown User',
            'email' => $googleUser->email,
            'google_id' => $googleUser->id,
            'email_verified_at' => now(),
            'password' => bcrypt(Str::random(24)), 
            // 'avatar' => $googleUser->avatar, 
        ]);

        $isNewUser = true;
        }
        return [
            'user' => $user,
            'is_new_user' => $isNewUser,
        ];
    }
}
