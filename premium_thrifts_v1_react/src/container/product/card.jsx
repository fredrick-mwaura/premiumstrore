import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductCard = ({ image, title, price, originalPrice, discount, rating, reviews }) => {
  return (
    <div className="group flex flex-col w-full bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
      {/* Product Image with Discount Badge */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-30 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{title}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-gray-700 ml-1">{rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({reviews})</span>
        </div>
        
        {/* Price */}
        <div className="mt-auto flex items-end">
          <span className="text-sm font-bold text-gray-900">{price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-500 line-through ml-2">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;