<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\{Storage, File};

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'description', 
        'price', 
        'stock', 
        'category', 
        'subCategory', 
        'brand', 
        'gender', 
        'imageLink',
        'color',
        'size',
        'marerial',
        'image'
    ];

    protected $casts = [
        'images'=>'array',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = Str::slug($product->name);
        });

        static::updating(function ($product) {
            $product->slug = Str::slug($product->name);
        });
    }

    /**
     * Relationship with Category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relationship with SubCategory
     */

     public function subCategory()
     {
        return $this->belongsTo(category::class);
     }

    public function order()
    {
        return $this->belongsToMany(Order::class, 'order_items')->withPivot('quantity', 'price')->withTimestamps();
    }

    /**
     * Accessor for formatted price
     */
    public function getFormattedPriceAttribute(): string
    {
        return 'ksh' . number_format(floatval($this->price), 2);
    }

    public function productImage()
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Scope for active products
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getImageUrlsAttribute()
    {
        $images = json_decode($this->images, true) ?? [];

        return collect($images)->map(function ($image){
            return  Storage::url('storage/products/' .$image);
        })->toArray();
    }

    /**
     * Scope for products in stock
     */
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    public static function getList(array $filters)
    {
        return self::with(['category', 'subCategory'])
            ->when(isset($filters['search']), function ($query) use ($filters) {
                $search = str_replace('%', '[%]', $filters['search']);
                $query->where('name', 'like', "%{$search}%");
            })
            ->when(isset($filters['category']), function ($query) use ($filters) {
                $query->where('category_id', $filters['category']);
            })
            ->when(isset($filters['min_price']), function ($query) use ($filters) {
                $query->where('price', '>=', $filters['min_price']);
            })
            ->when(isset($filters['max_price']), function ($query) use ($filters) {
                $query->where('price', '<=', $filters['max_price']);
            })
            ->latest('id')
            ->cursorPaginate(10); 
    }
    public static function deleteRecord($id)
    {
        try{
            $product_images = ProductImage::where('product_id', $id)->pluck('images');
            foreach($product_images as $productImage){
                $imagePath = public_path('storage/products/' . $productImage);
                if(File::exists($imagePath)){
                    File::delete( $imagePath);
                }
            }
            self::where('id', $id)->delete();
            return [
                'status' => true,
                'message' => 'product deleted successfully'
            ];

        }catch(\Exception $ex){
            return [
                'status' => false,
                'message' => 'error in deleting Product: ' . $ex->getMessage()
            ];
        }
    }
}