import { Colors } from "@/constants/Colors";
import { TEXT } from "@/constants/Text";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const NotificationScreen = ({ navigation }: { navigation: any }) => {
  const handleExploreButton = () => {
    navigation.navigate("ShopScreen");
  };
  return (
    <View style={styles.noResultsContainer}>
      <Image
        source={require("@/assets/images/notification-bell.png")}
        style={styles.image}
      />
      <Text style={styles.message}>{TEXT.NO_NOTIFICATIONS}</Text>
      <TouchableOpacity style={styles.button} onPress={handleExploreButton}>
        <Text style={styles.buttonText}>{TEXT.EXPLORE_CATEGORIES}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default NotificationScreen;
