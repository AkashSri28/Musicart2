// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn, user, token } = useAuth();
  const [cartTotal, setCartTotal] = useState(0);

  let totalProductCount = 0;

  cartItems.forEach(item => {
      totalProductCount += item.quantity;
  });

  const calculateCartTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.quantity * parseFloat(item.price.replace('₹', ''));
    });
    setCartTotal(total);
  };


  const fetchCartItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post('https://musicart-backend-vw7t.onrender.com/api/cart', 
        { userId: user._id }
        );
        if (response.status === 200) {
          setCartItems(response.data); 
          calculateCartTotal();
        } 
        else if (response.status === 201) {
          // Handle 404 error
          setCartItems([]);
          console.log('Cart not found');
        } 
        else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [isLoggedIn, user, totalProductCount, token]);

  const addToCart = async (product) => {
    try{
      const userId = user._id;
      const productId = product._id;
      const response = await axios.post('https://musicart-backend-vw7t.onrender.com/api/cart/add', {
        productId, userId
      });
      if (response.status === 200) {
        console.log('Product added to cart successfully');
        fetchCartItems();
      } else {
        console.error('Failed to add product to cart');
        // Optionally, you can show an error message or handle the error
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Optionally, you can show an error message or handle the error
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const userId = user._id;
      const response = await axios.put(`https://musicart-backend-vw7t.onrender.com/api/cart/updateQuantity`, {
        productId,
        quantity,
        userId 
      });
      if (response.status === 200) {
        console.log('Item quantity updated successfully');
        fetchCartItems();
      } else {
        console.error('Failed to update item quantity');
        // Optionally, you can show an error message or handle the error
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // Optionally, you can show an error message or handle the error
    }
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalProductCount, updateCartItemQuantity, cartTotal, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
