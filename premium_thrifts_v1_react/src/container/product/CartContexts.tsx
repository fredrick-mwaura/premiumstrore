import axios from "axios";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ProductItem } from "@/reducers/actions/types";

  // console.log(token)

  const userInfo = async () => {
  try{

    const resp = await axios.get('http://localhost:8000/api/loggedin-user',{
      headers: {
        'content-type': 'application/json'
      }
    })

    if(resp.data === 'success'){
      console.log(resp)
      localStorage.setItem('user', resp.data)
    }
  

  }catch(error){
    console.log('error in retrieving', error)
  }
  }

  export const callIt = async() => {
    // const token = localStorage.getItem('access_token');

    try{
     const resp = await axios.get('http://localhost:8000/api/isloggedin')
     
     console.log(resp);
         
  }catch(error){
    console.log('error, ', error)
  }

}
interface CartContextType {
  cart: ProductItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string | number) => void;
  handleRemove: (productId: string | number) => void;
  clearCart: () => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductItem) => {
    if (!product || !product.id) {
      toast.error("Invalid product!");
      return;
    }

    let newQuantity = 1;
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];
        newQuantity = (existingProduct.quantity || 1) + 1;
        updatedCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });

    toast.dismiss(); // Remove existing toast messages
    toast.success(`product added to cart`);
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    // if()
    // toast.success("Item removed from cart");
  };

  const handleRemove = (productId: string | number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const updateQuantity = (productId: string | number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    toast.success("Quantity updated");
  };

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, handleRemove, clearCart, updateQuantity, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}