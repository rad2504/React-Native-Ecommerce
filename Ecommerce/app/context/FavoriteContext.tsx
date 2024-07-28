import React, { createContext, useContext, useState } from 'react';

type FavoritesContextType = {
  favoriteProducts: Set<string>;
  toggleFavorite: (productId: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider= ({ children }:{children:any}) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavoriteProducts(prevFavorites => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(productId)) {
        updatedFavorites.delete(productId);
      } else {
        updatedFavorites.add(productId);
      }
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteProducts, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

