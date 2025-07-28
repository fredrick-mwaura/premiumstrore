<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if(!$user){
            return response()->json([
                'success' => false,
                'data'=>[]
            ]);
        }
        return response()->json([
            'success' => true,
            'data' => $user->addresses,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'street' => 'bail|sometimes|string|min:3',
            'town' => 'bail|sometimes|string',
            'postal_code' => 'bail|sometimes|string',
            'phone_number' => 'bail|sometimes|string|min:10|max:13'
        ]);
        if (empty($validated)) {
            return response()->json([
                'message' => 'No input provided.'
            ], 422);
        }
        $address = new Address($validated);
        $address->user_id = auth()->id();
        $address->save();

        return response()->json([
            'success' => true,
            'address' => $address
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'street' => 'bail|sometimes|string|min:3',
            'town' => 'bail|sometimes|string',
            'postal_code' => 'bail|sometimes|string',
            'phone_number' => 'bail|sometimes|string|min:10|max:13'
        ]);
        if (empty($validated)) {
            return response()->json([
                'message' => 'No input provided.'
            ], 422);
        }
        $address = Address::find($id);

        if($address)

        if($address->user_id !== auth()->id()){
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        $address->updateOrCreate($validated);

        return response()->json([
            'success'=>true,
            'message'=>'Address updated successfully',
        ], 201);
    }
}
