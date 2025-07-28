<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'brand' => 'nullable|string|max:255',
            'gender' => 'required|in:male,female,unisex',
        ];
    }
    public function messages(): array
    {
        return[
            'name.required' => 'The product name is required.',
            'price.min' => 'The price must be at least 0.',
            'stock.min' => 'Stock cannot be negative.',
            'category_id.exists' => 'The selected category does not exist.',
        ];
    }
}


