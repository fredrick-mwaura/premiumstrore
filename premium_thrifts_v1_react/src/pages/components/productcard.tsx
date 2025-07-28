import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  ratingCount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  // slug: string;
}

const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  originalPrice,
  discount,
  rating,
  ratingCount,
  isNew,
  // slug
}) => {
  const navigate = useNavigate();
  const slug = createSlug(title);
  return (
    // <Link to={`/product/${slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-md overflow-hidden">
        <div className="relative">
          <div className="h-40 overflow-hidden" onClick={()=>navigate(`/pro/${slug}`)}>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {discount && discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">-{discount}%</Badge>
          )}
          
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
          )}
        </div>
        
        <CardContent className="p-3">
          <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10">{title}</h3>
          
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          {rating && (
            <div className="mt-2 flex items-center">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              {ratingCount && (
                <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    // {/* </Link> */}
  );
};

export default ProductCard;