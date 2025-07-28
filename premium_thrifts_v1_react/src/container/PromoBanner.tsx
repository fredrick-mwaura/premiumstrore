import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

type PromoBannerProps = {
  message: string;
  shopLink?: string;
};

export const PromoBanner = ({ message, shopLink }: PromoBannerProps) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <motion.div 
      className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-3 flex items-center justify-center text-sm relative"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center container mx-auto px-4">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.span>
        
        {shopLink && (
          <motion.div 
            className="ml-2 font-medium cursor-pointer flex items-center group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="border-b border-white/50 group-hover:border-white transition-colors">
              {shopLink}
            </span>
            <ChevronRight size={16} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </motion.div>
        )}
      </div>
      
      <motion.button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
        onClick={() => setIsClosed(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X size={16} />
      </motion.button>
    </motion.div>
  );
};