import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Colors } from '../../constants/Colors'
import { TEXT } from '@/constants/Text';

export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {
  const { email, password } = route.params;
  
  const [gender, setGender] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState(null);

  const getButtonStyle = (selected: boolean) => {
    return selected ? [styles.genderButton, styles.selectedButton] : styles.genderButton;
  };

  const getTextStyle = (selected: boolean) => {
    return selected ? [styles.buttonText, styles.selectedButtonText] : styles.buttonText;
  };

  const handleFinish = () => {
    if (gender) {
      navigation.navigate("ShopScreen", { selectedGender: gender });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{TEXT.ABOUT_YOURSELF}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.questionText}>{TEXT.SHOP_FOR}</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={getButtonStyle(gender === 'Men')}
            onPress={() => setGender('Men')}
          >
            <Text style={getTextStyle(gender === 'Men')}>{TEXT.MEN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle(gender === 'Women')}
            onPress={() => setGender('Women')}
          >
            <Text style={getTextStyle(gender === 'Women')}>{TEXT.WOMEN}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.questionText}>{TEXT.OLD}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={ageRange}
            style={styles.picker}
            onValueChange={(itemValue) => setAgeRange(itemValue)}
          >
            <Picker.Item label={TEXT.AGE_RANGE} value={null} />
            <Picker.Item label="18-24" value="18-24" />
            <Picker.Item label="25-34" value="25-34" />
            <Picker.Item label="35-44" value="35-44" />
            <Picker.Item label="45-54" value="45-54" />
            <Picker.Item label="55-64" value="55-64" />
            <Picker.Item label="65+" value="65+" />
          </Picker>
        </View>
      </View>
      {/* <View style={styles.footer}> */}
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>{TEXT.FINISH}</Text>
        </TouchableOpacity>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectedButtonText: {
    color: Colors.BACKGROUND,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: Colors.INPUT_BACKGROUND,
  },
  selectedButton: {
    backgroundColor: Colors.BUTTON,
  },
  buttonText: {
    color: Colors.BLACK100,
  },
  pickerContainer: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 20,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  finishButton: {
    backgroundColor: Colors.BUTTON,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',

  },
  footer: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    padding: 16,
    paddingBottom: 20
  },
  finishButtonText: {
    color: Colors.BACKGROUND,
    fontSize: 16,
  },
});

