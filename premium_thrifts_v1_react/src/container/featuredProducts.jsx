import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
// import HeroBanner from './HeroBanner';

// Array of shoe images 
const shoeImages = [
  "/photos/11.svg",
  "/photos/12.svg",
  "/photos/13.svg",
  "/photos/14.svg",
  "/photos/15.svg",
  "/photos/16.svg",
];

export const FeaturedProduct = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Select a random shoe image when the component mounts
    const randomIndex = Math.floor(Math.random() * shoeImages.length);
    setCurrentImageIndex(randomIndex);
  }, []);
  
  // Function to get a new random shoe image
  const getNewRandomShoe = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * shoeImages.length);
    } while (newIndex === currentImageIndex && shoeImages.length > 1);
    
    setIsImageLoaded(false);
    setCurrentImageIndex(newIndex);
  };

  return (
    <motion.div 
      className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-900 to-gray-800 h-full shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,31,0.1),transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,90,31,0.1),transparent_60%)]"></div>
        
        <motion.div 
          className="absolute top-8 left-8 w-6 h-6 grid grid-cols-3 gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(9)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-1 h-1 bg-accent1-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="absolute right-1/4 bottom-20 text-accent1-500 font-bold text-3xl opacity-30"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.3, rotate: 0 }}
          transition={{ delay: 0.5 }}
        >
          X
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-10 text-accent1-500 font-bold text-4xl opacity-20"
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.2, rotate: 0 }}
          transition={{ delay: 0.6 }}
        >
          O
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-center p-6 md:p-10 relative z-10">
        {/* Product Image Section */}
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Animated radial lines */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.7, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(36)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 bg-accent1-500/50"
                style={{
                  height: '1.5px',
                  width: '120px',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 10}deg) translateX(-50%)`,
                }}
              />
            ))}
          </motion.div>

          {/* Discount Badge */}
          <motion.div 
            className="absolute -left-4 top-4 z-20"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay: 0.3 
            }}
          >
            <div 
              className="bg-accent1-500 rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold shadow-lg" 
              style={{ boxShadow: '0 0 20px rgba(255, 90, 31, 0.4)' }}
            >
              <span className="text-xl">50%</span>
              <span className="text-xs">OFF</span>
            </div>
          </motion.div>

          {/* Product ratings */}
          <motion.div 
            className="absolute -right-2 top-4 z-20 bg-white/10 backdrop-blur-md rounded-full py-1 px-3 flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">4.9</span>
          </motion.div>

          {/* Image Circle with Random Image */}
          <motion.div
            className="bg-white rounded-full w-56 h-56 flex items-center justify-center p-4 cursor-pointer z-10 hover:shadow-2xl transition-all duration-300"
            onClick={getNewRandomShoe}
            title="Click to see another shoe"
            style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={shoeImages[currentImageIndex]} 
                alt="Running shoe" 
                className="max-w-full h-auto object-contain transform -rotate-12"
                initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: -12,
                  transition: { 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(false)}
              />
            </AnimatePresence>
            
            {!isImageLoaded && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Tap to view text */}
          <motion.div
            className="absolute -bottom-2 80 text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Tap image to change model
          </motion.div>
        </motion.div>

        {/* Product Details */}
        <motion.div 
          className="md:ml-12 text-center md:text-left max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Label */}
          <motion.div
            className="inline-block bg-white/10 backdrop-blur-sm text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Featured Collection
          </motion.div>
          
          <motion.h3 
            className="text-3xl md:text-4xl font-light italic mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            New Collection
          </motion.h3>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-accent1-500">RUNNING</span>{" "}
            <span>SHOES</span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 mb-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Engineered for performance and designed for everyday life, these iconic shoes deliver comfort, style, and functionality.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              className="bg-accent1-500 hover:bg-accent1-600 py-6 px-8 rounded-full w-full sm:w-auto"
              variant="ghost"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              <span>Shop Now</span>
              <ChevronRight size={18} className="ml-1" />
            </Button>
            
            <motion.div
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-accent1-500">$199.99</span>
              <span className="text-sm text-gray-400 line-through ml-2">$399.99</span>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="text-gray-400 text-sm mt-8 border-t border-white/10 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center justify-center md:justify-start mb-1 space-x-2">
              <span className="text-accent1-100 font-medium">Customer Support:</span>
              <span>+000 123 456 789</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-accent1-100 font-medium">Website:</span>
              <span>www.premiumhub.com</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decoration Dots */}
      <motion.div 
        className="absolute bottom-6 left-6 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="w-2 h-2 bg-accent1-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 + i * 0.05 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};