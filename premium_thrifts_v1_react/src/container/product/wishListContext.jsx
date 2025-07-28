import { createContext, useReducer, useContext, useEffect } from "react";
import Swal from "sweetalert2"

const WishListContext = createContext();

//retrieve wishlist from localstorage

const getInitialWishlist = () => {
  const storedWishList = localStorage.getItem("wishlist");
  return storedWishList ? JSON.parse(storedWishList) : [];
}

const wishlistReducer = (state, action)=>{
  switch(action.type){
    case "ADD_TO_WISHLIST":
      return state.some(item => item.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return state.filter(item => item.id !== action.payload);
    default:
      return state;      
  }
}

export const WishlistProvider = ({children}) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, 0, getInitialWishlist);

  useEffect(()=>{
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])
  
  const addToWishList = (item) => {
    dispatch({
      type:"ADD_TO_WISHLIST", payload: item
    })
  }

const removeFromWishList = (id) => {
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
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
      Swal.fire('Removed!', 'The item has been removed from your wishlist.', 'success');
           
    }else if(result.dismiss === Swal.DismissReason.cancel){
      Swal.fire('cancelled', 'item still in wishlist', 'info')
    }
  });
};
  



  const wishlistCount = wishlist.length

  return(
    <WishListContext.Provider value = {{
      wishlist, addToWishList, removeFromWishList, wishlistCount,
    }}
    >
      {children}
    </WishListContext.Provider>
  )
 }

 export const useWishList = () => {
  return useContext(WishListContext)
 }


