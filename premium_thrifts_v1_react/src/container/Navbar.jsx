import React, { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import CategorySidebar from './CategorySidebar'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const ShowMenu = () => {
    return(
      <CategorySidebar/>
    )

  }

  return (
    <header className="w-full bg-white shadow-md z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="z-1" onHover={ShowMenu} >
            <Menu/>
          </div>
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-purple-700 font-bold text-2xl">PremiumHub</span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className={cn(
            "hidden md:flex items-center relative",
            isSearchOpen && "flex-grow mx-8"
          )}>
            <div className="relative w-full max-w-md">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-purple-600"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-700 font-medium transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-700 font-medium transition">Shop</a>
            <a href="#" className="text-gray-700 hover:text-purple-700 font-medium transition">Categories</a>
            <a href="#" className="text-gray-700 hover:text-purple-700 font-medium transition">Sale</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <button 
              className="md:hidden text-gray-600 hover:text-purple-700 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>

            {/* Favorites */}
            <button className="hidden sm:flex text-gray-700 hover:text-purple-700 transition relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Cart */}
            <button className="text-gray-700 hover:text-purple-700 transition relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Account */}
            <button className="hidden sm:flex text-gray-700 hover:text-purple-700 transition">
              <User size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-700 hover:text-purple-700 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Expandable */}
        {isSearchOpen && isMobile && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
                autoFocus
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div className="md:hidden border-t border-gray-200 animate-slide-up bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#" className="block py-2 px-4 text-purple-700 font-medium">Home</a>
            <a href="#" className="block py-2 px-4 text-gray-700 hover:text-purple-700">Shop</a>
            <a href="#" className="block py-2 px-4 text-gray-700 hover:text-purple-700">Categories</a>
            <a href="#" className="block py-2 px-4 text-gray-700 hover:text-purple-700">Sale</a>
          </div>
        </div>
      )}

      {/* Promotional Banner */}
      <div className="bg-purple-700 px-4 py-3 text-center text-white text-sm font-medium">
        <p className="flex items-center justify-center">
          🎉 Summer Sale: Get 50% Off & Free Express Delivery! 
          <a href="#" className="ml-2 underline text-white">Shop Now</a>
        </p>
      </div>
    </header>
  );
};

export default Navbar;
