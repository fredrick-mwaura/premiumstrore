import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface MappedProduct {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  tag: string;
  express: boolean;
  description: string;
}

export const products = async (): Promise<MappedProduct[]> => {
  try {
    const response = await axios.get<Product[]>("https://fakestoreapi.com/products");

    // Transform API response into the expected structure
    return response.data.map((product) => ({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      oldPrice: Number((product.price * 1.07).toFixed(2)), // Assuming a 7% increase for old price
      discount: 2, // Fixed discount value
      rating: product.rating.rate,
      reviews: product.rating.count,
      stock: Math.floor(Math.random() * 50) + 1, // Random stock value
      tag: "Official Store",
      express: true,
      description: product.description,
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

// const products = product.data;
