import React from 'react';
import { ChevronRight } from 'lucide-react';

type Category = {
  name: string;
  path: string;
};

const categories: Category[] = [
  { name: "Men's Fashion", path: "#" },
  { name: "Kid's Fashion", path: "#" },
  { name: "Women's Fashion", path: "#" },
  { name: "Sports & Fitness", path: "#" },
  { name: "Hoodies", path: "#" },
  { name: "Flash Sale", path: "#" },
  { name: "Shoes", path: "#" },
  { name: "Accessories", path: "#" },
  { name: "Electronics", path: "#" },
];

const SideMenu = () => {
  return (
    <aside className="w-full md:w-64 bg-background border-r border sticky">
      <nav className="py-6">
        <ul className="space-y-1">
          {categories.map((category, index) => (
            <li key={index}>
              <a 
                href={category.path}
                className="menu-item group"
              >
                <span className="flex-1">{category.name}</span>
                <ChevronRight 
                  size={16} 
                  className="text-gray-400 group-hover:text-brand-purple transition-colors duration-200"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;