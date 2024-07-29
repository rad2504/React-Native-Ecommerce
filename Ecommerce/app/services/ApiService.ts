const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`);
    const data = await response.json();
    console.log('Fetched cart items:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};


export const addProductToCart = async (userId: any, date: any, products: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date,
        products,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export const removeProductFromCart = async (cartId: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
};

