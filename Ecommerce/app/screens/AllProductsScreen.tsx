import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFavorites } from "../context/FavoriteContext";
import { Product } from "../models/Product";
import { useCart } from "../context/CartContext";
import { Colors } from "../../constants/Colors";

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
  const { cartProducts, togglecart } = useCart();

  const { width } = Dimensions.get("window");
  const numColumns = width > 600 ? 3 : 2;

  const renderProductItem = ({ item }: { item: Product }) => {
    const isFavorite = favoriteProducts.some(
      (product) => product.id === item.id
    );
    const isCart = cartProducts.some((product) => product.id === item.id);

    return (
      <View style={styles.productItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleFavorite(item)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={
                isFavorite
                  ? Colors.TOGGLE_ICON_ERROR
                  : Colors.PROFILE_OPTION_TOGGLE_DISABLE
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => togglecart(item)}
          >
            <Ionicons
              name={isCart ? "cart" : "cart-outline"}
              size={24}
              color={
                isCart
                  ? Colors.TOGGLE_ICON_ERROR
                  : Colors.PROFILE_OPTION_TOGGLE_DISABLE
              }
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
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.WHITE100,
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 150,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  oldPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
    textAlign: "center",
  },
  cartIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    borderRadius: 16,
    padding: 4,
  },
});

export default AllProductsScreen;
