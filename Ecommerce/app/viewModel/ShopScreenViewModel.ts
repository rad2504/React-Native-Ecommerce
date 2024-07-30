import { useState, useEffect, useCallback } from "react";
import { fetchCategories, fetchProducts } from "../services/ApiService";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

const categoryImages: { [key: string]: any } = {
  electronics:
    "https://s3-alpha-sig.figma.com/img/e350/65d5/55b8804e24889a7e678b8503269047e8?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XHf5zGohthjXsq-hlKoMJMTxh5MHZSS1CU68t4iAnWPRhB1EqaPDFPHzJJCzmAoYjXyLYPEMaXxNcaxLLR4DSkA5f7WbsfMizs95E~3Nf~W2qeUIXJH5csotN2UtnlakQXGf4EQGH8UVTKsqqW85-cjDsPrBBubUS5REjK4gQf5s8ZMrNjz-ca02B2e156lj3N27~H9MBwSP3V5g4qNnU8RbsFxUp1pRD9qa8FFswB1HT4CZKgW4nFQ6eCsMaohZsdEiQvu8b-6ioYa4blECeRubTEWlDI9BXMwf~a9Yw2EtWNN9Vrt9nDEfJdqQV59Aijxt2-Thjr1YK45VTvOoXA__",
  jewelery:
    "https://s3-alpha-sig.figma.com/img/e350/65d5/55b8804e24889a7e678b8503269047e8?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XHf5zGohthjXsq-hlKoMJMTxh5MHZSS1CU68t4iAnWPRhB1EqaPDFPHzJJCzmAoYjXyLYPEMaXxNcaxLLR4DSkA5f7WbsfMizs95E~3Nf~W2qeUIXJH5csotN2UtnlakQXGf4EQGH8UVTKsqqW85-cjDsPrBBubUS5REjK4gQf5s8ZMrNjz-ca02B2e156lj3N27~H9MBwSP3V5g4qNnU8RbsFxUp1pRD9qa8FFswB1HT4CZKgW4nFQ6eCsMaohZsdEiQvu8b-6ioYa4blECeRubTEWlDI9BXMwf~a9Yw2EtWNN9Vrt9nDEfJdqQV59Aijxt2-Thjr1YK45VTvOoXA__",
  "men's clothing":
    "https://s3-alpha-sig.figma.com/img/8d40/b2ff/9a729542c316774eec94b994b83da2b9?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VXfwuq1-uXX3Tyo5PmWoBqR4SKki8kGKVFU3z269kJutBguuJ8nACGuvoGq~t1pmi73apoXq3yqSrqxP6Vxz4ytGw8MyiZ7enDYwRy3eGZlVoN2rEtwOnJQxZwTsHSZC3EaGiHknIBwgPwJaujw2dBpmTG4R6-gwwk6Z0~fkx1cOW-Bv4ksQmIZHhqjly1S2BsMh0XCSJKXGYRvRXRyDOVsPeVCnOec2g2Se6ndzu67LirECzwgIo~Uhzuy8bgWzyYl74m-A2QMg-2G1K5RukVtPmVNWMJhggnsvJzESRDBLHFxC1ocllThCRBJ5tdm2qDGEwFFeiWm8xHTduGdDsw__",
  "women's clothing":
    "https://s3-alpha-sig.figma.com/img/a70b/d3f4/a5802a7e95c2f618b15c7c34d77bb9d1?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ATlTxplN-uTqJlKZvffI0GDq4hXUTSEJ4-2g3mTCbA6emfO65JcYpZ8oN677cDrFCOojSMJ3Cz4DvEJV52ak~MKc3UvSeOwfWn30ZEi~HxaZitRnvt6~IWeqREnc3Wkce9U9U9dmbN~EtdD7QWfUl3AMJBLQQmLhnY6Yonqvy347IHDYHKRVv4cLZJpcZC4Rc2yQAEEyXY665ymDxj9~2A2pHHzCG~Qt0ncNLzuFT7WXxZC~WbIPwgkxCwAQH7ssOB7Kik0xWPYWvF36XZd504wglFNtHVm4wrp3GX7wwPzhM8u3Y5Hsb66HYuY4mVXz~cv6ktMnw8nEqkz5ckfQ-A__",
};

export const useShopScreenViewModel = (initialCategory = "All") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(
    new Set()
  );
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const formattedCategories = data.map(
          (category: string, index: number) => ({
            id: index.toString(),
            name: category,
            image: categoryImages[category],
          })
        );
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
        console.error(
          `Error fetching products for category ${categoryToFetch}:`,
          error
        );
      }
    };
    loadCategories();
    loadProducts();
  }, [selectedCategory]);

  return {
    categories,
    products,
    selectedCategory,
    setSelectedCategory,
    favoriteProducts,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
  };
};
