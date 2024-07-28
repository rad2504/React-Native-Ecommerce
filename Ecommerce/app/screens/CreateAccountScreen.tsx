
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TitleText } from '../../components/TitleText'
import { Button } from '../../components/Button'
import { NewTextInput } from '../../components/NewTextInput'
import {Colors } from '../../constants/Colors'
import { TEXT } from '@/constants/Text';

export default function CreateAccountScreen({ navigation }: { navigation: any }) {


 const handleResetButton = () => {
     navigation.navigate("ForgotPasswordScreen");
 };
  const handleContinue = () => {
    navigation.navigate("SignInScreen");
  };

  const handleBack = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TitleText>{TEXT.CREATE_ACCOUNT}</TitleText>
      <NewTextInput
        placeholder={TEXT.FIRST_NAME}
        keyboardType="default"
        autoCapitalize="none"
      />
      <NewTextInput
        placeholder={TEXT.LAST_NAME}
        keyboardType="default"
        autoCapitalize="none"
      />
      <NewTextInput
        placeholder={TEXT.EMAIL_PLACEHOLDER}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <NewTextInput
        placeholder={TEXT.PASSWORD}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button onPress={handleContinue} title={TEXT.CONTINUE}  />
 
      <Text style={styles.signupText}>
        {TEXT.FORGOT_PASSWORD} <Text style={styles.signupLink} onPress={handleResetButton}>{TEXT.RESET}</Text>
      </Text>
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
    backgroundColor: Colors.BACKBUTTONBACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: Colors.BLACK,
    marginBottom: 70,
    fontSize: 14,
  },
  signupLink: {
    color: Colors.BLACK100,
    fontWeight: 'bold',
  },
});