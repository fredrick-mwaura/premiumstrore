import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/container/product/CartContexts";
import { useWishList } from '@/container/product/wishListContext';
import { useNavigate } from "react-router-dom";
import ProfileLayout from '../pages/profile/Layout.tsx'      

// Function to create a slug from a title
const createSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

const ClientWishlist: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishList, wishlistCount } = useWishList(); 
  const navigate = useNavigate();

  // Function to handle the click and navigate to ProductView
  const handleViewDetails = (title: string) => {
    const slug = createSlug(title);  // Generate slug based on the title
    navigate(`/pro/${slug}`);  // Navigate to ProductView with the generated slug
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    return discount ? price - (price * discount / 100) : price;
  };

  return (
    <Card className="shadow-md">
      <ProfileLayout title=" ">     
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-gray-100">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Heart className="text-red-500" size={24} /> My Wishlist - ({wishlistCount})
        </CardTitle>
        <CardDescription>Products you've saved for later</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {wishlist.length === 0 ? (
          <div className="text-center py-8 md:py-10">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-1">Save items you love to your wishlist</p>
            <Button className="mt-4" onClick={()=> navigate('/prod')}>Browse Products</Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex flex-col h-full border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full h-40 md:h-48 bg-gradient-to-tr from-gray-50 to-white rounded-lg flex items-center justify-center overflow-hidden border mb-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="object-contain h-full p-2"
                    />
                    {item.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Badge variant="outline" className="bg-white text-black font-semibold">Out of Stock</Badge>
                      </div>
                    )}
                    {item.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-600 font-semibold">-{item.discount}%</Badge>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base md:text-lg truncate">{item.title}</h3>
                        {/* <p className="text-xs md:text-sm text-gray-500 line-clamp-2">Product {description}</p> */}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-1 flex-shrink-0"
                        onClick={() => removeFromWishList(item.id)}
                      >
                        <Trash size={16} />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    
                    <div className="mt-2">
                      {item.discount ? (
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-base md:text-lg text-green-700">$ {calculateDiscountedPrice(item.price, item.discount).toLocaleString()}</p>
                          <p className="text-xs md:text-sm text-gray-500 line-through">$ {item.price.toLocaleString()}</p>
                        </div>
                      ) : (
                        <p className="font-bold text-base md:text-lg text-green-700">$ {item.price.toLocaleString()}</p>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-3 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 flex items-center justify-center gap-1 hover:bg-slate-100" 
                        onClick={() => handleViewDetails(item.title)} // Pass title to handleViewDetails
                      >
                        <Eye size={16} /> <span className="hidden xs:inline">View</span>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700"
                        disabled={item.stock === 0}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart size={16} /> <span className="hidden xs:inline">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 text-center">
              <Button variant="outline" className="hover:bg-gray-100 hover:text-gray-900 transition-colors">
                View All Saved Items
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      </ProfileLayout>
    </Card>
  );
};

export default ClientWishlist;
