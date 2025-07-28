<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
   
  public function handleGoogleToken(Request $request)
{
    try {
        $googleUser = Socialite::driver('google')
            ->stateless()
            ->getAccessTokenResponse($request->code); // <-- exchange the code for token

        $token = $googleUser['access_token'];

        $googleUserInfo = Socialite::driver('google')
            ->stateless()
            ->userFromToken($token); // <-- get user info from token

        $result = User::findOrCreateFromGoogle($googleUserInfo);
        $user = $result['user'];
        $isNew = $result['is_new_user'];

        $personalToken = $user->createToken('google-auth')->plainTextToken;

        return [
            'token' => $personalToken,
            'is_new_user' => $isNew
        ];

    } catch (Exception $e) {
        return response()->json([
            'error' => 'Invalid Google Token'
        ], 401);
    }
}

}
