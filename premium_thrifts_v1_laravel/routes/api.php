<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\{OrderController, AddressController, PaymentController, ProductController };

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//auth
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware(['auth:api'])->get('/user', fn() => auth()->user()); //auth user
Route::post('/forgot-password', [UserController::class,'forgotPassword']);
Route::post('/reset-password', [UserController::class,'resetPassword']);
Route::post('/verify-otp', [UserController::class,'verifyOtp']);

Route::get('/auth/redirect', function(){
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/callback', function(){
    $user = socialite::driver('google')->user();

    $user->token ;
});

Route::post('/auth/google/token', [GoogleAuthController::class, 'handleGoogleToken']);

Route::middleware('auth:api')->group(function () {
    // Route::get('/cart', [CartController::class, 'index']); 
    Route::put('/users/{id}', [UserController::class, 'update']);        
    Route::get('/products/{slug}', [ProductController::class, 'index']);   
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::Post('/order/{id}', [OrderController::class, 'store']);
    Route::any('/update-order/{id}', [OrderController::class, 'update']);
    Route::delete('/delete-order/{id}', [OrderController::class, 'destroy']);  
});

Route::prefix('pth')->middleware(['auth.jwt', 'is_admin'])->group(function () {

    Route::get('/users', [UserController::class, 'index']);

    /********************** payments ***********/
    Route::get('/payment-methods', [PaymentController::class, 'index']);
    Route::post('/payment-methods', [PaymentController::class, 'store']);
    Route::put('/payment-methods/{id}', [PaymentController::class, 'update']);
    Route::patch('/payment-methods/{id}/toggle', [PaymentController::class, 'toggle']);
    Route::get('/products/subcategories', [ProductController::class, 'getSubcategories']);
    Route::delete('/payment-methods/{id}', [PaymentController::class, 'destroy']);
    
    /************** product *********/
    Route::get('/orders', [OrderController::class, 'index']);


    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/product/{arg}', [ProductController::class, 'getProductBy']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::put('/product/update/{id}', [Productcontroller::class, 'update']);
    Route::delete('/product/destroy/{id}', [ProductController::class, 'destroy']);
});

Route::get('/search', [OrderController::class, 'search']);
Route::get('/loggedin-user', [UserController::class, 'index']);
Route::get('/isloggedin', [UserController::class, 'isLoggedIn']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/search', [ProductController::class, 'search']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/getProducts', [ProductController::class, 'index']);
