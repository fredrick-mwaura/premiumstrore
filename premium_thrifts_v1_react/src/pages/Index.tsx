import React, { useRef } from 'react';
import { ArrowRight, TrendingUp, Flame, Star, ShoppingBag, Percent, X } from 'lucide-react';
// import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from './components/productcard';
import CategoryCard from './components/categoryCard';
import SectionHeader from './components/sectionHeader';
import CountdownTimer from '../container/product/CountDowntimer';
import { 
  flashSaleProducts, 
  featuredProducts, 
  popularProducts, 
  topSellingProducts, 
  clearanceProducts,
  categories  
} from './mockProducts.js';
import { motion } from 'framer-motion';

// Main Homepage Component
const Index = () => {
  const summer_sale = useRef(null);
  const navigate = useNavigate();
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const summersaleBanner = () => {
    if(summer_sale.current){
      summer_sale.current.style.display = 'none';
    }
  };

  return (
    <div className="min-h-screen flex flex-col m-0">
      {/* Header Banner */}
      <div
        className="flex justify-between items-center summer-sale bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 text-sm font-medium"
        ref={summer_sale}
      >
        <p className="text-center flex-1">Summer Fashion Sale is on! Get up to 50% off on selected items</p>
        <span className="cursor-pointer" onClick={summersaleBanner}>
          <X size={20} />
        </span>
      </div>

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="mb-8 overflow-hidden bg-gradient-to-r from-pink-50 to-purple-100">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Fashion Essentials Sale</h1>
              <p className="text-gray-600 mb-6 md:pr-10">Elevate your style with the latest fashion trends. Limited time offers on premium brands.</p>
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={()=> navigate('/products')}>
                Shop Now
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Fashion collection" 
                className="h-full w-full object-cover object-center" 
              />
            </div>
          </div>
        </div>

        {/* Flash Sales Section with improved design */}
        <div className="container mx-auto px-4 mb-10 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
            <div className="flex items-center">
              <div className="p-2 rounded-md mr-3 bg-red-100">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Flash Sales</h2>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto">
              <CountdownTimer />
              <Link to="/products/flash-sales" className="text-sm text-pink-600 font-medium flex items-center ml-4 hover:text-pink-800 transition-colors">
                See All <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flashSaleProducts.map((product, index) => (
              <motion.div key={product.id || index} variants={item} className="h-full">
                  <ProductCard {...product} id={product.id} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Browse By Category Section */}
        <div className="container mx-auto px-4 mb-10 bg-white p-6 rounded-xl shadow-sm">
          <SectionHeader 
            title="Browse By Category" 
            icon={<ShoppingBag className="w-5 h-5 text-blue-500" />}
            backgroundColor="bg-blue-100"
            categorySlug="categories"
          />
          
          <div className="flex justify-evenly gap-4 px-4">
            {categories.map(category => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
        
        {/* Featured Deals Section */}
        <div className="container mx-auto px-4 mb-10 bg-white p-6 rounded-xl shadow-sm">
          <SectionHeader 
            title="Featured Deals" 
            icon={<Star className="w-5 h-5 text-yellow-500" />}
            backgroundColor="bg-yellow-100"
            categorySlug="featured-deals"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
        
        {/* Popular This Week Section */}
        <div className="container mx-auto px-4 mb-10 bg-white p-6 rounded-xl shadow-sm">
          <SectionHeader 
            title="Popular This Week" 
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            backgroundColor="bg-green-100"
            categorySlug="popular-this-week"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
        
        {/* Top Selling Items Section */}
        <div className="container mx-auto px-4 mb-10 bg-white p-6 rounded-xl shadow-sm">
          <SectionHeader 
            title="Top Selling Items" 
            icon={<Flame className="w-5 h-5 text-orange-500" />}
            backgroundColor="bg-orange-100"
            categorySlug="top-selling"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topSellingProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
        
        {/* Clearance Sale Section with enhanced design */}
        <div className="container mx-auto px-4 mb-8 bg-gradient-to-r from-pink-600 to-purple-600 p-6 rounded-xl shadow-sm">
          <SectionHeader 
            title="Clearance Sale" 
            icon={<Percent className="w-5 h-5 text-red-600" />}
            backgroundColor="bg-white"
            textColor="text-white"
            categorySlug="clearance-sale"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clearanceProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>        
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;