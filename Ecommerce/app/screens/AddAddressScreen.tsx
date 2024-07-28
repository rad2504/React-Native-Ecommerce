import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TitleText } from '../../components/TitleText';
import { Button } from '../../components/Button';
import { NewTextInput } from '../../components/NewTextInput';
import { Colors } from '../../constants/Colors';
import { useAddress } from '../context/AddressContext';
import { TEXT } from '@/constants/Text';


export default function AddAddressScreen({ navigation, route }:{navigation:any,route:any}) {
  const { address } = route.params || {};
  const { addresses, setAddresses } = useAddress();

  const [streetAddress, setStreetAddress] = useState(address?.streetAddress || '');
  const [city, setCity] = useState(address?.city || '');
  const [state, setState] = useState(address?.state || '');
  const [postcode, setPostcode] = useState(address?.postcode || '');

  const handleSave = () => {
    const newAddress = { streetAddress, city, state, postcode };

    if (address) {
      // Update existing address
      const updatedAddresses = addresses.map((addr: any) =>
        addr === address ? newAddress : addr
      );
      setAddresses(updatedAddresses);
    } else {
      // Add new address
      setAddresses([...addresses, newAddress]);
    }

    navigation.navigate('AddressDetailsScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
          <TitleText>{TEXT.ADD_ADDRESS}</TitleText>
      <NewTextInput
        placeholder={TEXT.STREET_ADDRESS}
        keyboardType="default"
        autoCapitalize="none"
        value={streetAddress}
        onChangeText={setStreetAddress}
      />
      <NewTextInput
        placeholder={TEXT.CITY}
        keyboardType="default"
        autoCapitalize="none"
        value={city}
        onChangeText={setCity}
      />
      <NewTextInput
        placeholder={TEXT.STATE}
        keyboardType="default"
        autoCapitalize="none"
        value={state}
        onChangeText={setState}
      />
      <NewTextInput
        placeholder={TEXT.ZIP_CODE}
        keyboardType="default"
        autoCapitalize="none"
        value={postcode}
        onChangeText={setPostcode}
      />
          <Button onPress={handleSave} title={TEXT.SAVE_BUTTON} />
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

