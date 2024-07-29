import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, Image, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchCartItems, removeProductFromCart } from '../services/ApiService';
import { Colors } from '@/constants/Colors';


export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  const loadCartItems = async () => {
    try {
      const items = await fetchCartItems();
      console.log('Cart items:', items); 
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      Alert.alert("Error", "Failed to fetch cart items.");
    }
  };

  loadCartItems();
}, []);


  const removeFromCart = async (cartId: any) => {
    try {
      await removeProductFromCart(cartId);
      setCartItems(cartItems.filter(item => item !== cartId));
      Alert.alert("Success", "Product removed from cart successfully!");
    } catch (error) {
      console.error('Error removing product from cart:', error);
      Alert.alert("Error", "Failed to remove product from cart.");
    }
  };
const renderCartItem = ({ item }: { item: any }) => {
  
  if (!item || !item.product) {
    console.error('Invalid item or product:', item);
    return null;
  }

  const { title, price } = item.product;

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{title || 'No title'}</Text>
        <Text style={styles.cartItemPrice}>{`$${price || '0.00'}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeItemButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Icon name="trash-outline" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
    paddingHorizontal: 20,
  },
  cartList: {
    paddingVertical: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.CART_ITEM,
    borderRadius: 10,
    padding: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: Colors.CART_ITEM_PRICE,
  },
  removeItemButton: {
    padding: 5,
  },
});
