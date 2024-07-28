import React, { createContext, useState, ReactNode } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
};

type ProductContextType = {
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ allProducts, setAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
