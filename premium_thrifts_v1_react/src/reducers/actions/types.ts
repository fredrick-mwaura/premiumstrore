export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_LOADING = 'SET_LOADING';

export interface ProductItem {
  id: string | number;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  stock: number;
  tag?: string;
  express?: boolean;
  quantity?: number;
}
