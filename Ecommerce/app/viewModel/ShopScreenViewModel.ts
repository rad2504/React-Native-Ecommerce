import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCategories, fetchProducts } from '../services/ApiService';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

const categoryImages: { [key: string]: string } = {
  "electronics": 'https://s3-alpha-sig.figma.com/img/e350/65d5/55b8804e24889a7e678b8503269047e8?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BghkY6bCFxYTapf7QPL~GdyW5WePtxsqsLAX9tEdFDhb2vLQ7sG6TB8R47YiDYV-YMWoUhBm0pDtSF73HS3sZGQZn31l~QwFUplU4P2SdkZkmQH3bDhj8xuOEulesmg~eiPo3fMR~14Cr85Q~g8u8Rb7KdrRGn5K1ZsCSEuXJY8q2G0EOvSPyBGl03Nu3RrpZlh~4uusKDsUUCj2gxuucVycfV~KoKapACrEJrjB1KalZdT58SbtyByZBCw~xEM0H7lSz5EoQqmVRE4ZIOQn5yy9STbWZ6s~rGAs3biY6fguiOHwR89C2TOXkcrot6ry~-iKA-ey9SFhStUGjHZ7eA__',
    "jewelery": 'https://s3-alpha-sig.figma.com/img/e350/65d5/55b8804e24889a7e678b8503269047e8?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BghkY6bCFxYTapf7QPL~GdyW5WePtxsqsLAX9tEdFDhb2vLQ7sG6TB8R47YiDYV-YMWoUhBm0pDtSF73HS3sZGQZn31l~QwFUplU4P2SdkZkmQH3bDhj8xuOEulesmg~eiPo3fMR~14Cr85Q~g8u8Rb7KdrRGn5K1ZsCSEuXJY8q2G0EOvSPyBGl03Nu3RrpZlh~4uusKDsUUCj2gxuucVycfV~KoKapACrEJrjB1KalZdT58SbtyByZBCw~xEM0H7lSz5EoQqmVRE4ZIOQn5yy9STbWZ6s~rGAs3biY6fguiOHwR89C2TOXkcrot6ry~-iKA-ey9SFhStUGjHZ7eA__',
    "men's clothing": 'https://s3-alpha-sig.figma.com/img/a70b/d3f4/a5802a7e95c2f618b15c7c34d77bb9d1?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hJj3V8A79k0LRlt2ztOi55g6MtdWjR5BOqR0qaQujlNp49akj~7r7MgXZSsxJSJIr93CFFc~SmmAXUx4kpCRBgchV0J~FALa~BH6f03AvFFkfJHfLI1e1ngtRqB2cAentyIdJQqb-VZn6a9qXR9KS1mAeUtS7ZqswQujbDgHux0OsFeXcDoYVfGYJeWzXV78LPsZZvmi4juM2c0h-lzBN1z3GumYjts-amhg-N925IL-nOCZaiwepJqBe~v9VLAXlAYZ1bUZb0pr~RYWSZHoNCGeOMyBq7fHi8MqJwJbsXVUI~BVAaJ16oKRyNERVX6xt84oalBTwkdN2F3NWy9N4A__',
    "women's clothing": 'https://s3-alpha-sig.figma.com/img/e350/65d5/55b8804e24889a7e678b8503269047e8?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BghkY6bCFxYTapf7QPL~GdyW5WePtxsqsLAX9tEdFDhb2vLQ7sG6TB8R47YiDYV-YMWoUhBm0pDtSF73HS3sZGQZn31l~QwFUplU4P2SdkZkmQH3bDhj8xuOEulesmg~eiPo3fMR~14Cr85Q~g8u8Rb7KdrRGn5K1ZsCSEuXJY8q2G0EOvSPyBGl03Nu3RrpZlh~4uusKDsUUCj2gxuucVycfV~KoKapACrEJrjB1KalZdT58SbtyByZBCw~xEM0H7lSz5EoQqmVRE4ZIOQn5yy9STbWZ6s~rGAs3biY6fguiOHwR89C2TOXkcrot6ry~-iKA-ey9SFhStUGjHZ7eA__',
};
export const useShopScreenViewModel = (initialCategory = 'All') => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());

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
  };
};
