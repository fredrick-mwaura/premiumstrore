<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'stock' => 'sometimes|required|integer|min:0',
        ];
    }
    public function messages(): array
    {
        return[
            'name.required' => 'The product name is required.',
            'price.min' => 'The price must be at least 0.',
        ];
    }
}
