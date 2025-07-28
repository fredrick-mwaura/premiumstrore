<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreProductRequest;

class UserController extends Controller
{

    protected $user;

    public function __construct()
    {

      $this->user = Auth::user();

    }

    public function index()
    {
        $customers = DB::table('users')->where('role', 'customer')->paginate(15);
        return response()->json([
            'users' => $customers,
            'message' => 'success'
        ], 200);
        
    }

    public function login(StoreUserRequest $request)
    {
        try {
            $credentials = $request->validated();

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email or password is incorrect',
                ], 401);
            }

            $user = auth()->user(); // or JWTAuth::user();
            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $token,
                'user' => $user,
            ]);


            // return response()->json([
            //     'status' => true,
            //     'message' => 'User logged in successfully',
            // ])->cookie( 'access_token', $token, 60, '/', '', true, true, false, 'None');

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function register(Request $request)
    {
        try {

            $request->validate([
                'first_name'=>'bail|required',
                'email'=>'bail|required|email|max:255',
                'password'=>'bail|confirmed|min:6',
            ]);
                // Create new user
            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

                // Automatically log in the user and generate token
                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'status' => true,
                    'message' => 'Registration successful',
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60,
                    'user' => $user,
                ], 201);

            } catch (\Throwable $th) {
                Log::error('Registration error', ['error' => $th]);

                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage(),
                    'error' => $th->getMessage(),
                ], 500);
            }
    }                      
    
/*
****** forgot password
*/ 
  public function forgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'phone_number' => 'nullable|string',
        ]);

        $user = User::where('email', $request->input('email'))
                    ->orWhere('phone_number', $request->input('phone_number'))
                    ->where('type', 'customer')
                    ->first();

        if ($user) {
            $otp = rand(100000, 999999);

            $user->otp = $otp;
            $user->save();

            $data = [
                'otp' => $otp,
                'name' => $user->name,
                'appName' => env('APP_NAME'),
                'text' => "Here is your one-time verification code: " . $otp,
            ];

            // Mail::to($user->email)->send(new PasswordResetMail($data)); // Uncomment if using

            return response()->json([
                'status' => true,
                'message' => 'OTP sent successfully',
                'data' => $data
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'User not found!'
        ], 404);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric|digits:6',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::where('otp', $request->input('otp'))
                    ->where('type', 'customer')
                    ->first();

        if ($user) {
            $user->password = Hash::make($request->input('password'));
            $user->otp = null;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Password reset successfully',
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'User not found or OTP invalid'
        ], 404);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function updateProfile(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'current_password' => 'bail|required|string',
            'first_name' => 'bail|sometimes|string|min:3',
            'last_name' => 'bail|sometimes|string|min:3',
            'email' => 'bail|sometimes|required|email|max:255|unique:users,email,' . $user->id,
            'is_subscribed' => 'boolean',
            'password' => 'bail|sometimes|required|string|min:6|confirmed',
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect password'
            ]);
        }

        // Email update
        if ($request->has('email')) {
            $user->email = $validated['email'];
        }

        // Password update
        if ($request->has('password')) {
            $user->password = Hash::make($validated['password']);
        }

        // Name update
        $fullname = explode(' ', $user->name, 2);
        $firstName = $fullname[0];
        $lastName = $fullname[1] ?? '';

        if ($request->has('first_name') && !$request->has('last_name')) {
            $user->name = $validated['first_name'] . ' ' . $lastName;
        }

        if (!$request->has('first_name') && $request->has('last_name')) {
            $user->name = $firstName . ' ' . $validated['last_name'];
        }

        if ($request->has('first_name') && $request->has('last_name')) {
            $user->name = $validated['first_name'] . ' ' . $validated['last_name'];
        }

        // Newsletter update
        if ($request->has('is_subscribed')) {
            $user->is_subscribed = $validated['is_subscribed'];
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully'
        ]);
    }


    public function getProfile()
    {
        $user = Auth::user();

        if(Auth::user()){
           $user = Auth::user();
           return new UserResource($user);
        }
    }

    public function isLoggedIn()
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        if($user){
            return response()->json([
                'crd' => $user,
                'user' => 1                
            ], 200);            
        }else{
            return response()->json([
                'user' => 0
            ], 200);
        }

    }    

}