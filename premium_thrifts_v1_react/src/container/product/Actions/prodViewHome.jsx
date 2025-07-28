import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import DynamicBreadcrumbs from "../../Layouts/Breadcrumb.jsx";
import ProductNotFound from "./ProductNotFound.jsx";
import { 
  flashSaleProducts, 
  featuredProducts, 
  popularProducts, 
  topSellingProducts, 
  clearanceProducts,
  categories
} from '@/pages/mockProducts.js'
import { useCart } from '../CartContexts.tsx';
import {useWishList} from '../wishListContext.jsx'
// import Footer from "@/components/footer.tsx";
import SimilarProducts from "./similarProducts.jsx";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const ProdViewHome = () => {
    const { addToCart } = useCart();
    const { addToWishList, removeFromWishList, wishlist } = useWishList();
    const location = useLocation();
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // Fetch products and product based on slug
    useEffect(() => {
      
        const loadProducts = async () => {
          const data = [
            ...flashSaleProducts,
            ...featuredProducts,
            ...popularProducts,
            ...topSellingProducts,
            ...clearanceProducts,
            ...categories
          ]
            setAllProducts(data);

            // Find the product by slug
            const foundProduct = location.state || data.find(p => createSlug(p.title) === slug);

            if (foundProduct) {
                setProduct(foundProduct);
                // Optional: You could add multiple images or handle images dynamically.
            } else {
                setProduct(null); // Set product as null if not found
            }
        };

        loadProducts();
    }, [slug, location.state]);

    // Check if the current product is in the wishlist
    const isInWishlist = product && Array.isArray(wishlist) && wishlist.some((item) => item.id === product.id);

    // Mock multiple images for the product (you can replace this with real images)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        if (product) {
            setProductImages(product.image ? [product.image , product.image, product.image] : []);  
        }
    }, [product]);

    if (!product) {
        return <ProductNotFound />;
    }

    const { id, image, title, price, description } = product;

    const colors = [
        { name: 'Red', value: 'bg-red-500' },
        { name: 'Blue', value: 'bg-blue-500' },
        { name: 'Black', value: 'bg-black' },
        { name: 'Gray', value: 'bg-gray-400' },
        { name: 'Green', value: 'bg-green-500' },
        { name: 'Purple', value: 'bg-purple-700' },
        { name: 'Violet', value: 'bg-violet-300' },
        { name: 'Dark Red', value: 'bg-red-800' }
    ];

    const sizes = [38, 39, 40, 42, 43, 44];

    // Functions for image navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === productImages.length - 1 ? 0 : prevIndex + 1);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === 0 ? productImages.length - 1 : prevIndex - 1);
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <DynamicBreadcrumbs />

                <div className="flex flex-col md:flex-row gap-8 mt-6">
                    {/* Product Image Card */}
                    {/* Product Image Card - Improved Responsive Version */}
                    <div className="w-full md:w-1/2 h-auto min-h-[200px] md:h-[400px] lg:h-[500px]">
                    <Card className="p-2 sm:p-4 md:p-6 bg-white overflow-hidden w-full h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative flex-1 flex items-center justify-center p-2">
                        <img 
                            src={productImages[currentImageIndex]} 
                            alt={`${title} - view ${currentImageIndex + 1}`} 
                            className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out hover:scale-[1.02]" 
                            loading="lazy"
                        />

                        {/* Navigation buttons - only show if multiple images */}
                        {productImages.length > 1 && (
                            <>
                            <Button 
                                variant="outline" 
                                size="icon"
                                disabled={currentImageIndex === 0}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-sm hover:shadow-md h-8 w-8 sm:h-10 sm:w-10 transition-all"
                                onClick={prevImage}
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>

                            <Button 
                                variant="outline" 
                                size="icon"
                                disabled={currentImageIndex === productImages.length - 1}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-sm hover:shadow-md h-8 w-8 sm:h-10 sm:w-10 transition-all"
                                onClick={nextImage}
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            </>
                        )}
                        </div>

                        {/* Image thumbnails indicator for multiple images */}
                        {productImages.length > 1 && (
                        <div className="flex justify-center gap-1.5 mt-2 p-2 overflow-x-auto">
                            {productImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-2 w-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                            ))}
                        </div>
                        )}
                    </Card>
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2 flex">
                        <div className="space-y-4 w-full flex flex-col">
                            <div>
                                <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                                    Featured
                                </Badge>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
                                <h2 className="text-xl md:text-2xl font-semibold text-purple-700 mt-2">
                                    $ {price.toFixed(2)}
                                </h2>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">{description}</p>
                            </div>

                            {/* Color and Size Selection */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Available Colors</h3>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map((color, index) => (
                                        <button 
                                            key={index} 
                                            className={cn(
                                                "w-8 h-8 rounded-full border-2 transition-all",
                                                color.value,
                                                selectedColor === index 
                                                    ? "ring-2 ring-purple-600 ring-offset-2" 
                                                    : "hover:scale-110 border-transparent"
                                            )}
                                            onClick={() => setSelectedColor(index)}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">Choose Size</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {sizes.map((size, index) => (
                                        <button 
                                            key={size} 
                                            className={cn(
                                                "border py-2 px-3 rounded-md transition-colors",
                                                selectedSize === index 
                                                    ? "bg-purple-600 text-white border-purple-600" 
                                                    : "hover:border-purple-600 hover:text-purple-600"
                                            )}
                                            onClick={() => setSelectedSize(index)}
                                        >
                                            EU {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-2 mt-auto">
                                <Button 
                                    className="bg-purple-600 hover:bg-purple-700 text-white w-full py-6"
                                    onClick={() => addToCart({ id, image, title, price, description })}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </Button>
                                <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 w-1/4" 
                                onClick={() => { isInWishlist ? removeFromWishList(id) : addToWishList({ id, image, title, price }) }}
                                >
                                    <Heart 
                                        className="w-4 h-4 transition-colors" 
                                        color={isInWishlist ? "red" : "gray"} 
                                        fill={isInWishlist ? "red" : "none"} 
                                    />
                                    <span className="sr-only">Add to favorites</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <SimilarProducts products={allProducts} currentProductId={id} />
            </div>
            {/* <div>
              <Footer />
            </div> */}
        </div>
    );
};

export default ProdViewHome;