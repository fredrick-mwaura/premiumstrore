import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart, Heart, Search, Menu, X, User, ShoppingBag
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCart } from "./product/CartContexts";
import { useWishList } from "./product/wishListContext";
import { callIt } from "./product/CartContexts";

const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishList();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debounced, setDebounced] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // API search call
  useEffect(() => {
    if (!debounced) return setSearchResults([]);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/products", {
          params: { search: debounced }
        });
        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error("Search fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debounced]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductClick = (slug) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/pro/${slug}`);
  };

  const categories = [
    "Men's Fashion", "Women's Fashion", "Kid's Fashion", "Sports", "Shoes", "Flash Sales"
  ];
  const account = ["Orders", "Wishlist", "Profile", "Settings", "Help Center"];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 shadow-lg backdrop-blur" : "bg-white"}`}>
      <div className="container mx-auto px-4 py-3">
        {/* Top Section */}
        <div className="flex items-center justify-between gap-4 mb-2">
          {/* Logo + Drawer */}
          <div className="flex items-center gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh]">
                <div className="px-4 py-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Menu</h3>
                    <Button variant="ghost" size="icon" asChild>
                      <DrawerTrigger>
                        <X className="h-5 w-5" />
                      </DrawerTrigger>
                    </Button>
                  </div>
                  <nav className="space-y-1">
                    {categories.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start text-base font-normal h-12"
                        onClick={() => navigate(`/products/${createSlug(item)}`)}
                      >
                        {item}
                      </Button>
                    ))}
                  </nav>
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Account</h4>
                    <div className="space-y-1">
                      {account.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="w-full justify-start text-base font-normal h-12"
                          onClick={() => navigate(`/${createSlug(item)}`)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">PremiumHub</span>
            </div>
          </div>

          {/* Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4 w-full h-10 rounded-full"
                value={searchTerm}
                onFocus={() => setShowResults(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
              />
              {showResults && searchResults.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchResults.slice(0, 7).map((product, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => handleProductClick(createSlug(product.title))}
                    >
                      {product.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Button
            onClick={()=>callIt()}
          >
            click me
          </Button>

          {/* User Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/wishlist')}>
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => navigate('/profile')}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2 relative">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 w-full rounded-full"
              value={searchTerm}
              onFocus={() => setShowResults(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
            />
            {showResults && searchResults.length > 0 && (
              <ul className="absolute top-full left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.slice(0, 5).map((product, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleProductClick(createSlug(product.title))}
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;