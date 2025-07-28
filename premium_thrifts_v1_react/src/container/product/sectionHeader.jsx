import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ title, icon, backgroundColor, textColor = "text-gray-800", categorySlug  }) => {

  const navigate = useNavigate();
  const SeeAll = () =>{
    if(categorySlug){
      navigate(`/products/${categorySlug}`)
    }
  }
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center">
        {icon && (
          <div className={`p-2 rounded-md mr-3 ${backgroundColor}`}>
            {icon}
          </div>
        )}
        <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>
      </div>
      <button 
        onClick={SeeAll}
        className="text-sm text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
      >
        See All <ArrowRight className="ml-1 w-4 h-4" />
      </button>
    </div>
  );
};

export default SectionHeader;