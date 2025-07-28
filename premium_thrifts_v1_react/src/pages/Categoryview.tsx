import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../container/product/ProductCard';
import SidebarFilter from '@/container/SideBarfilter.js';
// import DynamicBreadcrumbs from './DynamicBreadcrumbs';
import { 
  flashSaleProducts, 
  featuredProducts, 
  popularProducts, 
  topSellingProducts, 
  clearanceProducts,
  categories 
} from './mockProducts.js';

const CategoryProductsView = () => {
  const { slug } = useParams();
  
  // Combine all products into one array
  const allProducts = [
    ...flashSaleProducts,
    ...featuredProducts,
    ...popularProducts,
    ...topSellingProducts,
    ...clearanceProducts
  ];

  // Get current category details
  const currentCategory = categories.find(category => 
    `${category.subCategory}-${category.category}` === slug || 
    category.category === slug
  );
  
  // Filter products based on category and subcategory
  const categoryProducts = allProducts.filter(product => {
    if (!slug) return true;
    
    // Check if the URL matches 'subcategory-category' format (e.g., 'men-clothing')
    const [subCategory, category] = slug.split('-');
    
    if (category) {
      // If we have both subcategory and category
      return product.category === category && product.subCategory === subCategory;
    } else {
      // If we only have category
      return product.category === slug;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center gap-5">
      {/* <DynamicBreadcrumbs /> */}
      <div className='hidden md:flex'>
      <SidebarFilter/>
      </div>
      <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
          {currentCategory ? currentCategory.title : slug?.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600">
          Explore our collection of {currentCategory ? currentCategory.title.toLowerCase() : slug?.replace(/-/g, ' ')} products
        </p>
      </div>

      {currentCategory && (
        <div className="flex items-center gap-3 mb-6">
          <img 
            src={currentCategory.image} 
            alt={currentCategory.title} 
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <div>
            <span className="text-lg text-gray-700 font-medium block mb-2">{currentCategory.title}</span>
            <span className="text-sm text-gray-500">Starting from ${currentCategory.price}</span>
          </div>
        </div>
      )}

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
          <p className="text-gray-600 mb-4">We couldn't find any products in this category.</p>
          <Link 
            to="/" 
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Return to Home
          </Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default CategoryProductsView;