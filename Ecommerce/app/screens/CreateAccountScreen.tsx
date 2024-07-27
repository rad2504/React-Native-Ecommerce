
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: Colors.BORDER,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.INPUT_BACKGROUND,
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
  button: {
    width: '100%',
    backgroundColor: Colors.BUTTON,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: Colors.BACKGROUND,
    fontSize: 16,
    fontWeight: 'bold',
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
  socialButton: {
    width: '100%',
    borderColor: Colors.BORDER,
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 25,
    marginBottom: 10,
    paddingVertical: 15,
    flexDirection: 'row'
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});