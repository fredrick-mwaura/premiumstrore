import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type CategoryProps = {
  name: string;
  hasChildren?: boolean;
};

// Array of categories with unique indexes
const categories = [
  { name: "Men's Fashion", hasChildren: true },
  { name: "Women's Fashion", hasChildren: true },
  { name: "Kid's Fashion", hasChildren: true },
  { name: "Sports & Fitness", hasChildren: true },
  { name: "Hoodies", hasChildren: true },
  { name: "Flash Sale", hasChildren: true },
  { name: "Shoes", hasChildren: true },
  { name: "Accessories", hasChildren: true },
  { name: "Home Decor", hasChildren: true },
];

const Category: React.FC<CategoryProps> = ({ name, hasChildren }) => {
  return (
    <motion.div 
      className="py-3 px-4 flex justify-between items-center cursor-pointer rounded-md group hover:bg-brand-50 transition-colors duration-200"
      whileHover={{ x: 3 }}
    >
      <span className="group-hover:text-brand-700 transition-colors duration-200">{name}</span>
      {hasChildren && (
        <ChevronRight 
          size={16} 
          className="text-gray-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all duration-200" 
        />
      )}
    </motion.div>
  );
};

export const CategorySidebar = () => {
  return (
    <div className="w-52 lg:w-56 bg-background rounded-lg shadow-sm overflow-hidden">
      <div className="py-3 px-4 bg-brand-50 border-b border-brand-100">
        <h3 className="font-medium text-brand-800">Categories</h3>
      </div>
      <nav className="py-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Category name={category.name} hasChildren={category.hasChildren} />
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

