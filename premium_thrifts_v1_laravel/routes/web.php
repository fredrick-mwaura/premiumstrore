<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/clear', function () {
    Artisan::call('optimize');
    Artisan::call('optimize:clear');
    return view('Optimize');
});

Route::get('/', function () {
    return view('welcome');
});

// Route::middleware('admin')->group(function(){
//      Route::post('login', [LoginController::class, 'authenticate']);
//     Route::post('admin-forget-password', [ForgotPasswordController::class, 'forgetPassword']);
//     Route::post('admin-reset-password', [ResetPasswordController::class, 'resetPassword']);
// });