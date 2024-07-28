import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TitleText } from '../../components/TitleText';
import { Colors } from '../../constants/Colors';
import { useAddress } from '../context/AddressContext';
import { TEXT } from '@/constants/Text';


export default function AddressDetailsScreen({ navigation }:{navigation:any}) {
  const { addresses, setAddresses } = useAddress();

  const handleAddAddress = () => {
    navigation.navigate('AddAddressScreen');
  };

  const handleEditAddress = (address: any) => {
    navigation.navigate('AddAddressScreen', { address });
  };

  const renderAddressList = () => {
    return addresses.map((address: { streetAddress: any; city: any; state: any; postcode: any; }, index: React.Key | null | undefined) => (
      <View key={index} style={styles.addressContainer}>
        <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
          {`${address.streetAddress}, ${address.city}, ${address.state} ${address.postcode}`}
        </Text>
        <TouchableOpacity onPress={() => handleEditAddress(address)} style={styles.editButton}>
                <Text style={styles.editButtonText}>{TEXT.EDIT_BUTTON_ADDRESS}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TitleText>Address Details</TitleText>
      {addresses.length === 0 ? (
        <View style={styles.noAddressContainer}>
                  <Text style={styles.noAddressText}>{TEXT.DONT_HAVE_ADDRESS}</Text>
          <TouchableOpacity onPress={handleAddAddress}>
                      <Text style={styles.addButtonText}>{TEXT.ADD_ADDRESS}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {renderAddressList()}
          <TouchableOpacity onPress={handleAddAddress} style={styles.addMoreButton}>
                          <Text style={styles.addMoreButtonText}>{TEXT.ADD_MORE_BUTTON_ADDRESS}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    marginLeft: 15,
  },
  editButtonText: {
    color: Colors.BUTTON,
    fontSize: 16,
  },
  noAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  noAddressText: {
    fontSize: 16,
  },
  addButtonText: {
    color: Colors.BUTTON,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addMoreButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.BUTTON,
    borderRadius: 8,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: Colors.WHITE100,
    fontSize: 16,
  },
});
