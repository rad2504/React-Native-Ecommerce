// src/context/FavoritesContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models/Product';

interface CartContextType {
  cartProducts: Product[];
  togglecart: (product: Product) => void;
  isCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const togglecart = (product: Product) => {
    setCartProducts((currentCart) =>
      currentCart.some((item) => item.id === product.id)
        ? currentCart.filter((item) => item.id !== product.id)
        : [...currentCart, product]
    );
  };

  const isCart = (productId: string) => {
    return cartProducts.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider value={{ cartProducts, togglecart, isCart }}>
      {children}
    </CartContext.Provider>
  );
};
