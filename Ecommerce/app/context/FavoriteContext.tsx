import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models/Product';

interface FavoritesContextType {
  favoriteProducts: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    setFavoriteProducts((currentFavorites) =>
      currentFavorites.some((item) => item.id === product.id)
        ? currentFavorites.filter((item) => item.id !== product.id)
        : [...currentFavorites, product]
    );
  };

  const isFavorite = (productId: string) => {
    return favoriteProducts.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteProducts, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
