import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import ProductCard from '../container/product/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  flashSaleProducts, 
  featuredProducts, 
  popularProducts, 
  topSellingProducts, 
  clearanceProducts,
  categories
} from './mockProducts.js';
import SidebarFilter from '../container/SideBarfilter.js'

// const createSlug = (title: String) => title.toLowerCase().replace(/\s+/g, "-");

// Define a type for our product structure
interface Product {
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
  description?: string;
  category?: string;
  subCategory?: string;
}

const AllProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const navigate = useNavigate();

  // const handleViewDetails = (title: string) => {
  //   const slug = createSlug(title);  // Generate slug based on the title
  //   navigate(`/product/${category}`);  // Navigate to ProductView with the generated slug
  // };
  
  useEffect(() => {
    // Set the products based on the category
    switch(category) {
      case 'flash-sales':
        setProducts(flashSaleProducts);
        setTitle('Flash Sales');
        break;
      case 'featured-deals':
        setProducts(featuredProducts);
        setTitle('Featured Deals');
        break;
      case 'popular-this-week':
        setProducts(popularProducts);
        setTitle('Popular This Week');
        break;
      case 'top-selling':
        setProducts(topSellingProducts);
        setTitle('Top Selling Items');
        break;
      case 'clearance-sale':
        setProducts(clearanceProducts);
        setTitle('Clearance Sale');
        break;
        case 'categories':
          setProducts(categories);
          setTitle('categories');
          break;
      default:
        setProducts([]);
        setTitle('Products');
    }
  }, [category]);

  useEffect(() => {
    // Apply filter when products or activeFilter changes
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => 
        product.category?.toLowerCase() === activeFilter.toLowerCase() || 
        product.subCategory?.toLowerCase() === activeFilter || product.category === activeFilter.toLowerCase()
      ));
    }
  }, [products, activeFilter]);

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'children', label: 'Children' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'shoes', label: 'Shoes' }
  ];

  return (
    <>
    <div className="bg-gray-50 min-h-screen flex">
      <div className="hidden md:block md:w-64 shrink-0 sticky top-0 z-10">
         <SidebarFilter />
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <div className="flex justify-start md:gap-5 mb-6">
          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-3"
            >
              <ArrowLeft className="h-10 w-10" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800 md:mt-5">{title}</h1>
          </div>

          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 m-0" />
            <span className="text-sm font-medium mr-3">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    activeFilter === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-12 min-h-screen items-center">
            <p className="text-gray-500">No product with that filter</p>
          </div>
        )}
      </div>
    </div>
      {/* <Footer/> */}
    </>
  );
};

export default AllProducts;