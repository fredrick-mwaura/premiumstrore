<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    private $Admin;
     
    public function index()
    {
        try{
            $payment = Payment::all();
            return response()->json($payment);
            
        }catch(\Throwable $e){
            // Log::error("message: " . $e->getMessage());
            return response()->json([
                'error'=>$e->getMessage(),
            ], 500);

        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string',
            'provider'=>'nullable|string',
            'account_details'=>'required|string'
        ]);

        $exists = Payment::where('name', $validated['name'])->where(isset($validated['provider']),
            function($q) use($validated){
                return $q->where('provider', $validated['provider']);
            })->exists();
            
        if($exists){
            return response()->json([
                'message'=>'This Payment already exists!'
            ], 409);
        }            

        $payment = Payment::create($validated);
        return response()->json([
            'message'=>' method added successfully!',
            'status'=>true
        ], 201);
    }

    public function toogleActive($id)
    {
        $payment = Payment::find($id);
        $payment->active = !$payment->active;
        $payment->save();

        return response()->json([
            'status'=>true,
            'active'=>$payment->active
        ], 201);
    }

    public function update (Request $request, $id)
    {
        $payment = Payment::find($id);
        $validated = $request->validate([
            'name'=>'nullable|string',
            'provider'=>'nullable|string',
            'account_details'=>'nullable|string'
        ]);

        Payment::update($validated);

        return response()->json([
            'status'=>true,
            'message'=>'payment updated successfully'
        ], 201);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);
        $payment->delete();

        return response()->json([
            'status'=>true,
            'message'=>'payment method deleted successfully!'
        ], 200);
    }
}
