import React from 'react';

const CategoryCard = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center transform transition-transform hover:scale-105">
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-50 shadow-sm relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-medium text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            View
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-sm font-medium text-center text-gray-800">{title}</h3>
    </div>
  );
};

export default CategoryCard;
