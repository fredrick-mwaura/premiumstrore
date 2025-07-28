import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import Product from "./components/Product";
const routes = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
    },
    {
        path: "/wishlist",
        element: <Wishlist/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
    {
        path: "/product/:id",
        element: <Product/>
    }
];

export default routes;