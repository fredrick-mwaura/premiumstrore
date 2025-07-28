import React from "react";
import ProductCard from "./ProductCard";
import { products } from "./items";
import SidebarFilter from "../SideBarfilter";

const Popular = () => {
  return (
    <div className="mx-auto px-2 py-3 w-30">
      {/* Main two-column layout */}
      <div className="flex gap-3">
        {/* Sidebar (hidden on smaller screens) */}
        <div className="hidden md:block w-1/4">
          <SidebarFilter />
        </div>

        {/* Products section */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-wrap gap-2">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
