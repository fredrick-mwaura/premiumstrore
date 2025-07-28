<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'stock' => $this->stock,
            'price' => $this->price,
            'category' => $this->category,
            'subCategory' => $this->subCategory,
            'gender' => $this->gender,
            'brand' => $this->brand,
            'description' => $this->description,
            'imageLink' => $this->imageLink,
            'color' => $this->color,
            'size'=> $this->size,
            // 'image'=>
        ];
    }
}
