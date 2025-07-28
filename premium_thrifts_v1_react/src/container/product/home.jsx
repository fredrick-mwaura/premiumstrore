import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer';

const ProductCard = ({ image, title, price, originalPrice, discount }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                {discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {discount}% OFF
                    </div>
                )}
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
                <div className="flex items-center mt-1">
                    <p className="font-semibold text-gray-900">$ {price}</p>
                    {originalPrice && (
                        <p className="ml-2 text-sm text-gray-500 line-through">$ {originalPrice}</p>
                    )}
                </div>
                <button className="mt-2 w-full bg-purple-600 text-white py-1 px-3 rounded text-sm font-medium hover:bg-purple-700">
                    Purchase
                </button>
            </div>
        </div>
    );
};

const CategoryCard = ({ image, title }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full h-50 overflow-hidden rounded-lg bg-gray-100">
                <img src={image} alt={title} className="w-full h-auto object-cover" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-center">{title}</h3>
        </div>
    );
};

const CountdownTimer = () => {
    return (
        <div className="flex space-x-2 mb-4">
            <div className="bg-gray-800 text-white py-1 px-3 rounded">
                <span className="text-lg font-bold">03</span>
            </div>
            <div className="bg-gray-800 text-white py-1 px-3 rounded">
                <span className="text-lg font-bold">23</span>
            </div>
            <div className="bg-gray-800 text-white py-1 px-3 rounded">
                <span className="text-lg font-bold">19</span>
            </div>
            <div className="bg-gray-800 text-white py-1 px-3 rounded">
                <span className="text-lg font-bold">56</span>
            </div>
        </div>
    );
};

const Home = () => {
    
    const navigate = useNavigate();
    // Sample data
    const flashSaleProducts = [
        { id: 1, title: 'Nike Running Shoes', price: '1700', originalPrice: '2200', discount: 23, image: '/photos/2.png' },
        { id: 2, title: 'Blue Denim Jeans', price: '1790', originalPrice: '2500', discount: 28, image: '/photos/2.png' },
        { id: 3, title: 'Sports Sneakers', price: '1700', originalPrice: '2300', discount: 26, image: '/photos/2.png' },
        { id: 4, title: 'Casual Sneakers', price: '1790', originalPrice: '2400', discount: 25, image: '/photos/2.png' },
        { id: 5, title: 'Designer Shoes', price: '2200', originalPrice: '3000', discount: 27, image: '/photos/2.png' }
    ];

    const categories = [
        { id: 1, title: 'New Arrival', image: '/photos/2.png' },
        { id: 2, title: 'Men', image: '/photos/2.png' },
        { id: 3, title: 'Swimming', image: '/photos/2.png' },
        { id: 4, title: 'Flash Sale', image: '/photos/2.png' },
        { id: 5, title: 'Women', image: '/photos/2.png' },
        { id: 6, title: 'Kids', image: '/photos/2.png' },
        { id: 7, title: 'Shoes', image: '/photos/2.png' },
        { id: 8, title: 'Sports & Outdoor', image: '/photos/2.png' }
    ];

    const popularProducts = [
        { id: 1, title: 'Nike Running Shoes', price: '1700', image: '/photos/2.png' },
        { id: 2, title: 'Gray Denim Jeans', price: '1790', image: '/photos/2.png' },
        { id: 3, title: 'Blue Navy Jacket', price: '1700', image: '/photos/2.png' },
        { id: 4, title: 'Bucket Hat', price: '1790', image: '/photos/2.png' },
        { id: 5, title: 'Casual Denim Pants', price: '1790', image: '/photos/2.png' },
        { id: 6, title: 'Blue T-Shirt', price: '1700', image: '/photos/2.png' },
        { id: 7, title: 'Fashion Cap', price: '1790', image: '/photos/2.png' },
        { id: 8, title: 'Red Hoodie', price: '1790', image: '/photos/2.png' }
    ];
    const shopNow = () =>{
        navigate('/prodprod')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Flash Sales Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-gray-900">Flash Sales</h2>
                    </div>
                    <CountdownTimer />
                    <button className="text-sm text-purple-600 font-medium flex items-center">
                        See All <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {flashSaleProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>

            {/* Browse By Category Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Browse By Category</h2>
                    <button className="text-sm text-purple-600 font-medium flex items-center">
                        See All <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories.map(category => (
                        <CategoryCard key={category.id} {...category} />
                    ))}
                </div>
            </div>

            {/* Denim Promotion Banner */}
            <div className="mb-10 bg-purple-600 rounded-lg p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">Denim That Moves with You!</h2>
                        <p className="text-purple-200 mb-4">Explore our collection of upgradable, flexible jeans that fit the lifestyle you choose.</p>
                        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium flex items-center" onClick={shopNow}>
                            Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>
                    <div className="w-full md:w-1/3">
                        <img src="/site-assets/products/img.png" alt="Denim collection" className=" w-full rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Popular Products Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Popular Products</h2>
                    <button className="text-sm text-purple-600 font-medium flex items-center">
                        See All <ArrowRight className="ml-1 w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;