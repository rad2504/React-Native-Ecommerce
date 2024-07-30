import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useShopScreenViewModel } from "../viewModel/ShopScreenViewModel";
import { TEXT } from "@/constants/Text";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "../_layout";
import { Colors } from "@/constants/Colors";
import { useFavorites } from "../context/FavoriteContext";
import { Product } from "../models/Product";
import { useCart } from "../context/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ShopScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState<string>("recommended");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string>("sort");
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const { togglecart, cartProducts } = useCart();

  type ShopScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ShopScreen"
  >;
  const navigation = useNavigation<ShopScreenNavigationProp>();

  const { categories, products, selectedCategory, setSelectedCategory } =
    useShopScreenViewModel(selectedCategory);
  
   
  const filteredProducts = useMemo(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedSearchText)
    );
  }, [searchText, products]);

  const sortedProducts = useMemo(() => {
    const parsedProducts = filteredProducts.map((product) => {
      const parsedPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

      return {
        ...product,
        parsedPrice: isNaN(parsedPrice) ? 0 : parsedPrice,
      };
    });

    switch (selectedSort) {
      case "newest":
        return parsedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "lowest":
        return parsedProducts.sort((a, b) => a.parsedPrice - b.parsedPrice);
      case "highest":
        return parsedProducts.sort((a, b) => b.parsedPrice - a.parsedPrice);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, selectedSort]);

  const handleSeeAllPress = () => {
    navigation.navigate("AllProductsScreen", { products });
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => {
    const isFavorite = favoriteProducts.some(
      (product) => product.id === item.id
    );
    const isCart = cartProducts.some((product) => product.id === item.id);

    return (
      <View style={styles.productItem}>
        <View style={styles.productImageContainer}>
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
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          )}
        </View>
      </View>
    );
  };

  const openModal = (type: any) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSortSelection = (option: any) => {
    setSelectedSort(option);
    closeModal();
  };
  const renderFilterOptions = () => {
    if (sortedProducts.length > 0) {
      return (
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterOption} onPress={openModal}>
            <Text
              style={[
                styles.filterText,
                selectedSort ? styles.selectedFilter : undefined,
              ]}
            >
              Sort by
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#333"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {searchText === "" ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{TEXT.CATEGORIES}</Text>
              </View>
              <FlatList
                data={categories}
                horizontal
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{TEXT.PRODUCTS}</Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                  <Text style={styles.seeAll}>{TEXT.SEE_ALL}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={products.slice(0, 5)}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.productList}
              />
            </View>
          </>
        ) : (
          <>
            {renderFilterOptions()}
            {sortedProducts.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Image
                  source={require("@/assets/images/search.png")}
                  style={styles.image}
                />
                <Text style={styles.message}>{TEXT.NO_SEARCH_PRODUCTS}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSearchText("")}
                >
                  <Text style={styles.buttonText}>
                    {TEXT.EXPLORE_CATEGORIES}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.section}>
                <Text style={styles.resultsCount}>
                  {sortedProducts.length} Results Found
                </Text>
                <FlatList
                  data={sortedProducts}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper}
                  contentContainerStyle={styles.productList}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => handleSortSelection("recommended")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === "recommended" && styles.selectedSortOption,
                ]}
              >
                Recommended
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortSelection("newest")}>
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === "newest" && styles.selectedSortOption,
                ]}
              >
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortSelection("lowest")}>
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === "lowest" && styles.selectedSortOption,
                ]}
              >
                Lowest Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortSelection("highest")}>
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === "highest" && styles.selectedSortOption,
                ]}
              >
                Highest Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: Colors.NOTIFICATION_BUTTON,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    textAlign: "center",
  },
  productList: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },

  productItem: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    alignItems: "center",
  },
  productImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: Colors.CART_ITEM_PRICE,
  },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 14,
    color: Colors.PRODUCT_PRICE,
  },
  selectedFilter: {
    fontWeight: "bold",
    color: Colors.NOTIFICATION_BUTTON,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: Colors.PRODUCT_PRICE,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.NOTIFICATION_BUTTON,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE100,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  sortOptionText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  selectedSortOption: {
    fontWeight: "bold",
    color: Colors.NOTIFICATION_BUTTON,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },

  productPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartButton: {
    marginLeft: 10,
  },

  cartIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    borderRadius: 16,
    padding: 4,
  },
  selectedCategoryItem: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.BUTTON,
  },

  closeButtonText: {
    color: Colors.WHITE100,
    fontSize: 16,
  },
});
