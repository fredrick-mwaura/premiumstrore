<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $cast = [
        'images' => array()
    ];

    protected $fillable = [
        'images',
        'imageLink'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getProductImages($productId)
    {
        if($productId){
            try{

                $productImages = array();
                $images = ProductImage::where('product_id', $productId)->pluck('images');

                if(count($images)){
                    array_push($productImage, $images);

                }
                $byUrl = ProductImage::where('product_id', $productId)->pluck('imageLink');
                if(count($byUrl)){
                    array_push($productImages, $images);
                }

            }catch(\Exception $ex){
                return $ex;
            }
        }
    }
}
