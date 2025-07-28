// useCartActions.ts
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addToCart, removeFromCart, clearCart, updateQuantity } from '../cartSlice';
import Swal from 'sweetalert2';
import { ProductItem } from './types.ts';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: ProductItem) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId: string | number) => {
    dispatch(removeFromCart(productId));
  };

  const handleRemoveWithConfirmation = (productId: string | number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveFromCart(productId);
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (productId: string | number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    handleRemove: handleRemoveWithConfirmation,
    clearCart: handleClearCart,
    updateQuantity: handleUpdateQuantity,
  };
};