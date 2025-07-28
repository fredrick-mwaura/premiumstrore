<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtCookieParser
{
  public function handle($request, Closure $next)
  {
    if($request->hasCookie('access_token')){
      $token = $request->cookie('access_token');
      JWTAuth::setToken($token);
      try{
        $user = JWTAuth::authenticated($token);
        auth()->setUser($user);
        
      } catch (\Exception $ex){
        return response()->json([
          'message' => 'Unauthorized',
        ], 401);
      }
    } else {
      return response()->json([
        'message' => 'token not provided.'
      ], 401);
    }
    return $next($request);
  }
}