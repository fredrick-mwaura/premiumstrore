import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "./CartContexts";
import {useWishList} from './wishListContext.jsx'

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  stock: number;
  tag?: string;
  express?: boolean;
}

const createSlug = (title: string): string => title.toLowerCase().replace(/\s+/g, "-");

const ProductCard: React.FC<ProductCardProps> = ({
  id, 
  image, 
  title, 
  price, 
  oldPrice, 
  discount, 
  rating, 
  reviews, 
  stock, 
  tag, 
  express 
}) => {
  const navigate = useNavigate();
  const slug = createSlug(title);
  const productView = () => {
    navigate(`/pro/${slug}`);
  };

  const { addToCart } = useCart();

  const { wishlist, addToWishList, removeFromWishList } = useWishList();

  const isInWishlist = wishlist.some((item) => item.id === id);

  return (
    <Card className="group overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Tags */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {/* {tag && (
          <Badge variant="secondary" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-2 py-1">
            {tag}
          </Badge>
        )} */}
        {discount && (
          <Badge variant="destructive" className="font-medium px-2 py-1">
            -{discount}%
          </Badge>
        )}
      </div>
      
      {/* Wishlist button */}
      <button 
      className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white" 
      onClick={() => isInWishlist ? removeFromWishList(id) : addToWishList({ id, image, title, price })}
    >
      <Heart 
        className="w-4 h-4 transition-colors" 
        color={isInWishlist ? "red" : "gray"} 
        fill={isInWishlist ? "red" : "none"} 
      />
    </button>

      {/* Image Container with subtle zoom effect */}
      <div 
        className="relative p-2 flex justify-center items-center cursor-pointer overflow-hidden bg-gray-50" 
        onClick={productView}
      >
        <div className="h-32 sm:h-44 md:h-40 lg:h-44 flex items-center justify-center w-full">
          <img 
            src={image} 
            alt={title || "Product Image"} 
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-2 flex flex-col flex-grow bg-white">
        {/* Title */}
        <h3 
          className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer mb-2" 
          onClick={productView}
        >
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "w-3 h-3 md:w-4 md:h-4",
                  index < Math.floor(rating) ? "fill-yellow-400" : "text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center flex-wrap gap-1.5 mb-2">
          <span className="text-base md:text-lg font-bold text-indigo-700">${price.toFixed(2)}</span>
          {oldPrice && <span className="text-xs md:text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
        </div>

        {/* Stock Status */}
        <p className={cn(
          "text-xs mb-2",
          stock > 0 ? 'text-gray-600' : 'text-red-500 font-medium'
        )}>
          {stock > 0 ? (
            <>Only <span className="font-semibold">{stock}</span> left in stock</>
          ) : (
            "Out of stock"
          )}
        </p>

        {/* Express Badge */}
        {express && (
          <div className="flex items-center text-xs text-purple-600 font-medium mb-3 bg-purple-50 self-start px-2 py-0.5 rounded-full">
            <Truck className="w-3.5 h-3.5 mr-1" />
            <span>Express Delivery</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={cn(
            "w-full mt-auto text-white text-sm font-medium py-2 rounded-md transition-colors duration-200",
            stock > 0 
              ? "bg-purple-600 hover:bg-purple-700" 
              : "bg-gray-300 cursor-not-allowed"
          )}
          disabled={stock === 0}
          onClick={() => stock > 0 && addToCart({id, image, title, price, oldPrice, discount, rating, reviews, stock, tag, express })}
        >
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;