import { useState, useEffect, useCallback } from 'react';
import { fetchCategories, fetchProducts} from '../services/ApiService';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

const categoryImages: { [key: string]: any } = {
  "electronics": '@/assets/images/electronic.png',
  "jewelery": '@/assets/images/jewelery.png',
  "men's clothing": '@/assets/images/mens-clothing.png',
  "women's clothing":'@/assets/images/women-clothing.png',
};

export const useShopScreenViewModel = (initialCategory = 'All') => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const formattedCategories = data.map((category: string, index: number) => ({
          id: index.toString(),
          name: category,
          image: categoryImages[category] || 'https://via.placeholder.com/150',
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(selectedCategory);
        const formattedProducts = data.map((product: any) => ({
          id: product.id.toString(),
          name: product.title,
          price: `$${product.price}`,
          oldPrice: product.price > 100 ? `$${product.price + 50}` : undefined,
          image: product.image,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error(`Error fetching products for category ${selectedCategory}:`, error);
      }
    };

    loadCategories();
    loadProducts();
  }, [selectedCategory]);


  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteProducts((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  

  return {
    categories,
    products,
    selectedCategory,
    setSelectedCategory,
    favoriteProducts,
    toggleFavorite,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
  };
};




