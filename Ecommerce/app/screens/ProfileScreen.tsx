import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = ({route,navigation}:{route:any, navigation:any}) => {
 
  const { email } = route.params;

  const name = email ? email.split('@')[0] : 'User';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: '' }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option} onPress={() =>navigation.navigate("AddressDetailsScreen")}>
          <Text style={styles.optionText}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Support</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE100,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    margin: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  edit: {
    color: 'purple',
    marginTop: 5,
  },
  optionContainer: {
    marginTop: 20,
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
  },
  signOutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: 'red',
    fontSize: 18,
  },
});

export default ProfileScreen;
