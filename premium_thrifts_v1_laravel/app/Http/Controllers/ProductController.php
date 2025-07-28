<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\{Product, ProductImage, Category, SubCategory};
use Illuminate\Http\JsonResponse;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB, Log};
use App\Services\FuzzySearch;

class ProductController extends Controller
{

    protected $searchService;

    public function __construct(FuzzySearch $searchService)
    {
        $this->searchService = $searchService;
    }

    /**
     * Display a listing of products with pagination
     */
    public function index()
    {
        $products = DB::table('products')->get()->map(function ($product) {

            $product->images = ProductImage::getProductImages($product->id)->paginate(50);

            return $product;
        });

        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Store a newly created Product.
     *
     * @param \App\Http\Requests\StoreProductRequest $request
     * @return \Illuminate\Http\Response
     **/
    public function store(StoreProductRequest $request)
    {
        try {
            $variants = json_decode($request->variants, true);
            Log::info($variants);
            $mappedVariants = collect($variants)->keyBy('type');

            $slug = \Helpers::createSlug($request->name);

            // Create product without images first
            $product = Product::create([
                'name' => $request->name,
                'slug' => $slug,
                'stock' => $request->stock ?? 1,
                'price' => $request->price,
                'category' => $request->category,
                'subCategory' => $request->subCategory ?? null,
                'gender' => $request->gender ?? 'unisex',
                'brand' => $request->brand ?? null,
                'description' => $request->description,
                'size' => $mappedVariants['size']['value'] ?? null,
                'color' => $mappedVariants['color']['value'] ?? null,
                'material' => $mappedVariants['material']['value'] ?? null,
            ]);

            // Handle multiple image uploads
            if ($request->hasFile('images')) {
                if ($request->hasFile('images')) {
                    $filenames = [];

                    foreach ($request->file('images') as $image) {
                        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                        Storage::disk('public')->putFileAs('products', $image, $filename);
                        $filenames[] = $filename;
                    }
                    ProductImage::create([
                        'product_id' => $product->id,
                        'images' => $filenames
                    ]);
                }
            }    
            return response()->json([
                'status' => true,
                'message' => 'Product added successfully',
                'product' => $product->load('images'),
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Error while adding the product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


     /**
     * Update the specified topics in storage.
     *
     * @param \App\Http\Requests\UpdateTopicRequest $request
     * @param id $id
     * @return \Illuminate\Http\Response
     **/

    /**
     * Display the specified product
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json(new ProductResource($product->load(['productImage', 'category', 'subCategory'])));
    }

    /**
     * Update the specified product
     */
    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Remove the specified product
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'id' => 'bail|required|integer|exists:products,id'
        ]);
        try{
            $id = $validated['id'];
            $deleted = Product::deleteRecord($id);
            if($deleted['status'] === true){
                return response()->json([
                    'success' => true,
                    'message' => 'product deleted successfully'
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Error has occured' . $deleted['message']
                ]);
            }
        } catch (\Exception $ex){
            return response()->json([
                'success' => false,
                'message' => 'error in deleting the product: ' . $ex->getMessage()
            ]);
        }
    }

    public function getSubcategories(Request $request)
    {
        $subcategories = SubCategories::all();
        return response()->json([
            'subcategories' => $subcategories
        ]);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            'success' => true,
            'categories' => $categories
        ], 200);
    }

    public function search(Request $request)
    {       
        $searchService = app(FuzzySearch::class);
        $results = $searchService->search(
            $request->input('query'),
            Product::class,
            ['name', 'description', 'sku'],
            3
        );
        
        return response()->json([
            'results' => $results
        ]);
    }

    public function getProductBy(Request $request)
    {
        $query = Product::query();

        if($request->has('categories')){
            $query->whereIn('category', $request->category);
        }
        if($request->has('subcategories')){
            $query->whereIn('subcategory', $request->subcategories);
        }
    }
    
}