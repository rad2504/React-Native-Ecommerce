import { StyleSheet, TouchableOpacity,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TitleText } from '../../components/TitleText';
import { Button } from '../../components/Button';
import { NewTextInput } from '../../components/NewTextInput';
import { Colors } from '../../constants/Colors';
import { useState } from 'react';

export default function AddAddressScreen({ navigation, route }: { navigation: any, route: any }) {
  const { address } = route.params || {};

  const [streetAddress, setStreetAddress] = useState(address?.streetAddress || '');
  const [city, setCity] = useState(address?.city || '');
  const [state, setState] = useState(address?.state || '');
  const [postcode, setPostcode] = useState(address?.postcode || '');

  const handleSave = () => {
    navigation.navigate('AddressDetailsScreen', {
      streetAddress,
      city,
      state,
      postcode,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TitleText>Add Address</TitleText>
      <NewTextInput
        placeholder="Street Address"
        keyboardType="default"
        autoCapitalize="none"
        value={streetAddress}
        onChangeText={setStreetAddress}
      />
      <NewTextInput
        placeholder="City"
        keyboardType="default"
        autoCapitalize="none"
        value={city}
        onChangeText={setCity}
      />
      <NewTextInput
        placeholder="State"
        keyboardType="default"
        autoCapitalize="none"
        value={state}
        onChangeText={setState}
      />
      <NewTextInput
        placeholder="Postcode"
        keyboardType="default"
        autoCapitalize="none"
        value={postcode}
        onChangeText={setPostcode}
      />
      <Button onPress={handleSave} title="SAVE" />
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
});