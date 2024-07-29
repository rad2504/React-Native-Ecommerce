import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favoriteProducts: Set<string>;
  toggleFavorite: (productId: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavoriteProducts((prevFavorites) => {
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

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
