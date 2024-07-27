import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const FavoritesScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Favorite Screen</Text>
        <Text style={styles.description}>This is where you can view your products marked as favorite.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default FavoritesScreen;
