// context/CartContext.js

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (course) => {
    setCartItems((prevItems) => [...prevItems, course]);
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== courseId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};