import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProductContext } from '../context/ProductContext';
import { FavoritesContext } from '../context/FavoriteContext';

type Product = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
};

const FavoritesScreen = () => {
  const { allProducts } = useContext(ProductContext) ?? { allProducts: [] };
  const { favoriteProducts, toggleFavorite } = useContext(FavoritesContext) ?? { favoriteProducts: new Set(), toggleFavorite: () => {} };

  console.log("All Products:", allProducts);
  console.log("Favorite Products:", Array.from(favoriteProducts));

  const favoriteProductsList = allProducts.filter(product => favoriteProducts.has(product.id));

  const renderProductItem = ({ item }: { item: Product }) => {
    const isFavorite = favoriteProducts.has(item.id);

    return (
      <View style={styles.productItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleFavorite(item.id)}
          >
            <Icon 
              name={isFavorite ? 'favorite' : 'favorite-border'} 
              size={24} 
              color={isFavorite ? '#ff6347' : '#ccc'} 
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteProductsList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
});

export default FavoritesScreen;

