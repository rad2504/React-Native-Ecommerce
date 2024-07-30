import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../models/Product';
import { Colors } from '@/constants/Colors'; 
import { useCart } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TEXT } from '@/constants/Text';

const FavoriteScreen: React.FC = () => {
  const { cartProducts, togglecart} = useCart();

  const renderProductItem = ({ item }: { item: Product }) => {
    const isCart = cartProducts.some(product => product.id === item.id);
    return (
      <View style={styles.productItem}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => togglecart(item)}
        >
           <Ionicons
              name={isCart ? 'cart' : 'cart-outline'}
              size={24}
              color={isCart ? Colors.TOGGLE_ICON_ERROR : Colors.PROFILE_OPTION_TOGGLE_DISABLE}
            />
        </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
          {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartProducts.length > 0 ? (
        <FlatList
          data={cartProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <Text style={styles.noFavoritesText}>{TEXT.NO_CART_PRODUCT}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
    paddingHorizontal: 20,
  },
  productList: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productItem: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    alignItems: 'center',
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 14,
    color: Colors.CART_ITEM_PRICE,
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  noFavoritesText: {
    fontSize: 16,
    color: Colors.PRODUCT_PRICE,
    textAlign: 'center',
    marginVertical: 20,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    borderRadius: 16,
    padding: 4,
  },
});

export default FavoriteScreen;
