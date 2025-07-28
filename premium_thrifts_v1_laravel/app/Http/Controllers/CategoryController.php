<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try{
            $data['results'] = Category::getLists($request->all());
            $data['categories'] = Category::where('parent_id', 0)->where('status', 0)->get();

            return response()->json([
                'categories' => $data['categories']
            ]);
        } catch(\Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'failed to fetch categories' . $ex->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|min:3'
        ]);

        $exists = Category::where('name', $validated['name'])->first();
        if($exists){
            return response()->json([
                'status'=>false,
                'message'=>'category already exists',
            ]);            
        }
        
        Category::create($validated);
        
        return response()->json([
            'status'=>true,
            'message'=>$validated['name'] . ' created successfully'
        ], 201);
        
    }

    public function destroy(Category $category)
    {
        $mainCategory = Category::where('id', $category)->get();

        if($mainCategory){
            $mainCategory->delete();

            return response()->json([
                'success' => true,
                'message'=>'category deleted successfully'
            ]);
        }else{
            $category->delete();

            return response()->json([
                'success' => false,
                'message'=>'subcategory deleted successfully'
            ]);
        }

    }
}
