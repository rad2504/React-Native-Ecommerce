import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const NotificationScreen = ({ navigation}: { navigation: any }) => {

  return (
    <View style={styles.noResultsContainer}>
        <Image source={require('@/assets/images/notification-bell.png')} style={styles.image} />
        <Text style={styles.message}>No Notifications Yet</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShopScreen')} >
          <Text style={styles.buttonText}>Explore Categories</Text>
        </TouchableOpacity>
      </View>
    
  );
};

const styles = StyleSheet.create({

  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE100,
  },
});

export default NotificationScreen;
