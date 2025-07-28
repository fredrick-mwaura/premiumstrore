import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.tsx";
import { products as fetchProducts } from "./items.ts";
import SidebarFilter from "../SideBarfilter";
import DynamicBreadcrumbs from "../Layouts/Breadcrumb.jsx";
import { motion } from "framer-motion";
import Footer from "../footer.jsx";
import Loader from '@/lib/Loader'

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); 
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    getProducts();
  }, []);

  // Animation variants for staggered loading
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-16 py-3 w-full">
      <div className="m-4 p-5">
        <DynamicBreadcrumbs />
      </div>

      {/* Main two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar (hidden on smaller screens) */}
        <div className="hidden md:block md:w-64 shrink-0 sticky top-0 z-10">
          <SidebarFilter />
        </div>

        {/* Products section */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse-soft"><Loader/></div>
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 auto-rows-fr gap-4 sm:gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))"
              }}
              variants={container}
              initial="hidden"
              animate="show"
            >
              {products.map((product, index) => (
                <motion.div key={product.id || index} variants={item} className="h-full">
                  <ProductCard {...product} id={product.id} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
              <p className="text-muted-foreground">No products available.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductList;