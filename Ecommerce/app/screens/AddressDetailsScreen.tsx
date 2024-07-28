import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TitleText } from '../../components/TitleText';
import { Colors } from '../../constants/Colors';

export default function AddressDetailsScreen({ navigation, route }: { navigation: any, route: any }) {
  const { streetAddress, city, state, postcode } = route.params;

  const handleEdit = () => {
    navigation.navigate('AddAddressScreen', {
      address: { streetAddress, city, state, postcode },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TitleText>Address</TitleText>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
          {`${streetAddress}, ${city}, ${state} ${postcode}`}
        </Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    backgroundColor: '#f0f0f0', 
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginVertical: 20,
  },
  addressText: {
    fontSize: 16,
    flex: 1, // Takes remaining space
  },
  editButton: {
    marginLeft: 35, 
  },
  editButtonText: {
    color: Colors.BUTTON,
    fontSize: 16,
  },
});
