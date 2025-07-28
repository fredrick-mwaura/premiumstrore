import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  categorySlug?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  icon, 
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  categorySlug 
}) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center">
        {icon && (
          <div className={`px-4 rounded-md mr-3 ${backgroundColor}`}>
            {icon}
          </div>
        )}
        <h2 className={`text-xl font-bold ${textColor}`}>{title}</h2>
      </div>
      
      {categorySlug && (
        <Link 
          to={`/products/${categorySlug}`}
          className={`text-sm font-medium flex items-center hover:opacity-80 transition-opacity ${textColor === 'text-white' ? 'text-white' : 'text-pink-600 hover:text-pink-800'}`}
        >
          See All <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;