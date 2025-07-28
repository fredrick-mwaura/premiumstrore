import React from "react";
import ProductCard from "../ProductCard.tsx";

const SimilarProducts = ({ products, currentProductId }) => {
  // Filter out the current product from similar products
  const similarProducts = products.filter(product => product.id !== currentProductId);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;