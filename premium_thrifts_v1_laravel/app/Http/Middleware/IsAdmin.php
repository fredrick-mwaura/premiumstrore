<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Auth::check()){
            return response()->json([
                'status'=> false,
                'message'=>'You need to login first!'
            ]);
        }
        if($request->user()->role != 'admin'){
            dd($request->user());
            return response()->json([
                'message'=>'you are unauthorized to access this page.'
            ], 403);
        }
        return $next($request);
    }
}
