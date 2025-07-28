import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '/empty_cart.svg'; 

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-5">
            <p className="text-lg mb-3">
                Ooh! Sorry, but it seems that you don't have items in your cart!
            </p>
            <img 
                src={emptyCart} 
                alt="Empty Cart" 
                width="206" 
                height="206" 
                className="cartt"
            />
            <h3 className="italic mt-3 text-xl">Empty cart!</h3>
            <p className="text-sm mt-2">
                <Link to="/" className="text-blue-500 hover:underline">
                    Click here to shop!
                </Link>
            </p>
        </div>
    );
};

export default EmptyCart;
