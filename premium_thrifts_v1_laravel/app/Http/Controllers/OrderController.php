<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FuzzySearch;
use App\Models\{Order, Product};
use Illuminate\Support\Facades\{Auth, Log};

class OrderController extends Controller
{
    protected $searchService;

    public function __construct(FuzzySearch $searchService)
    {
        $this->searchService = $searchService;
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        Log::info('cookie: ' . $request->cookie('name' . $user));

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role === 'admin') {
            // Admin gets all orders
            $orders = Order::with(['user', 'products'])->get(); 
            return response()->json($orders);
        }

        if ($user->role === 'customer') {
            $orders = Order::with(['products'])
                        ->where('user_id', $user->id)
                        ->get();
            return response()->json($orders);
        }

        // Default fallback
        return response()->json(['message' => 'Unauthorized'], 403);
    }


    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id'=>'required|integer',
            'total'=>'required|numeric|min:0',
            'status'=>'required|string|in:pending,processing,completed,cancelled'
        ]);

        if(!Product::find($validated['product_id'])){
            return response()->json([
                'message'=>'product does not exist'
            ], 404);
        }

        $exists = Order::where('user_id', $validated['user_id'])->where('status', $validated['status'])->first();        

        if($exists){
            return $this->update($request, $exists->id);
        }
        
        $order = Order::create($validated);
        return response()->json([
            'status'=>true,
            'message'=>'order placed successfully',
            'order'=>$order
        ], 201);       

    }

    public function update (Request $request, Order $order)
    {
        $validated = $request->validate([
            'total'=>'sometimes|numeric|min:0',
            'status'=>'sometimes|string|in:pending,processing,completed,canceled',
        ]);

        $order->update($validated);

        return response()->json([
            'order'=>$order,
            'message'=>'order updated successful',
        ]);
    }

    public function destroy(Order $order)
    {
        if($order){
            $order->delete();
            return response()->json([
                'message'=>'order delete successful'
            ], 204);
        }
    }


    public function search(Request $request)
    {       
        $searchService = app(FuzzySearch::class);
        $results = $searchService->search(
            $request->input('query'),
            Order::class,
            ['name'],
            3
        );
        
        return response()->json([
            'results' => $results
        ]);
    }
}
