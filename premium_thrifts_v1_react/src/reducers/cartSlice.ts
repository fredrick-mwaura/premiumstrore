// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from './actions/types.ts';
import axios from 'axios'

interface CartState {
  items: ProductItem[];
}

const base_url = 'http://localhost:8000'

const isLoggedIn = async () => {
  try{
    const resp = await axios.get('base_url/api/isloggedin')

    if(resp.data.status === 'success'){
      if(resp.data.user = 1){
        return 'true'
      }else{
        return 'false'
      }
    }
  }catch(error){
    console.log('error in checkin if user is logged in:', error)
  }
  
}


const loadCartFromLocalStorage = (): ProductItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductItem>) => {

      // if(localStorage)
      const product = action.payload;
      if (!product || !product.id) return;

      const existingProductIndex = state.items.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        const existingProduct = state.items[existingProductIndex];
        state.items[existingProductIndex] = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 1) + 1,
        };
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string | number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity < 1) return;

      const productIndex = state.items.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        state.items[productIndex].quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

export default cartSlice.reducer;