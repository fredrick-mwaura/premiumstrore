import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  id: number;
  name: string;
  icon: string;
  category: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ name, icon, category }) => {
  return (
    <Link 
      to={`/category/${category}`} //slug-> category
      className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center"
    >
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        <img src={icon} alt={name} className="max-w-full max-h-full" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </Link>
  );
};

export default CategoryCard;
