import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { useShopScreenViewModel } from '../viewModel/ShopScreenViewModel';
import { RootStackParamList } from '../_layout';
import { TEXT } from '@/constants/Text';
import {StackNavigationProp} from '@react-navigation/stack';

type ShopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShopScreen'>;

export default function ShopScreen() {
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');

  const {
    categories,
    products,
    selectedCategory,
    setSelectedCategory,
    favoriteProducts,
    toggleFavorite,
  } = useShopScreenViewModel(selectedCategory);

  const filteredProducts = useMemo(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().startsWith(lowercasedSearchText)
    );
  }, [searchText, products]);

  const handleSearchPress = () => {
    console.log('Search Pressed');
  };

  const handleSeeAllPress = () => {
    navigation.navigate('AllProductsScreen', { products });
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => setSelectedCategory(item.name)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => toggleFavorite(item.id)}
        >
          <Icon
            name={favoriteProducts.has(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={favoriteProducts.has(item.id) ? '#e74c3c' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#333" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchPress}
          />
        </View>
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
            contentContainerStyle={styles.categoryList}
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
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.productList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 14,
  },
  productList: {
    paddingHorizontal: 8,
  },
  productItem: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 1,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#7f58ff',
    paddingHorizontal: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});


