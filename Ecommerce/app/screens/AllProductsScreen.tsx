import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '../context/FavoriteContext';
import { Product } from '../models/Product';

interface AllProductsScreenProps {
  route: {
    params: {
      products: Product[];
    };
  };
}

const AllProductsScreen: React.FC<AllProductsScreenProps> = ({ route }) => {
  const { products } = route.params;
  const { favoriteProducts, toggleFavorite } = useFavorites();

  const { width } = Dimensions.get('window');
  const numColumns = width > 600 ? 3 : 2;

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
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#f8f8f8',
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
    textAlign: 'center',
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
});

export default AllProductsScreen;

