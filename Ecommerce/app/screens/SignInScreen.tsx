
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TEXT} from '../../constants/Text'
import { Button } from '../../components/Button'
import { SocialButton } from '../../components/SocialButton'
import { TitleText } from '../../components/TitleText'
import { NewTextInput } from '../../components/NewTextInput'
import {Colors } from '../../constants/Colors'




export default function SignInScreen({ navigation }: { navigation: any }) {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

 
  const validate = (text:string) => {

    setEmail(text);

    if (text.trim() === '') {
      setError(''); 
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setError(TEXT.ERROR_INVALID_EMAIL);
      } else {
        setError(''); 
      }
    }
  };
  const handleContinue = () => {
    if (!email) {
    } else if (error) {
      setError(TEXT.ERROR_EMAIL_REQUIRED)
    } else {
     navigation.navigate("PasswordSignInScreen", { email });
    }
  };

   const handleCreate = () => {
    navigation.navigate("CreateAccountScreen");
  };
  return (
    <View style={styles.container}>
      <TitleText>{TEXT.SIGN_IN}</TitleText>
      <NewTextInput
        placeholder={TEXT.EMAIL_PLACEHOLDER}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={validate}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button onPress={handleContinue} title={TEXT.CONTINUE} disabled={!email || !!error} />
 
      <Text style={styles.signupText}>
        {TEXT.DONOT_HAVE_ACCOUNT}{' '} <Text style={styles.signupLink} onPress={handleCreate}>{TEXT.CREATE_ONE}</Text>
      </Text>
      <SocialButton onPress={() => {  }} imageSource={require('@/assets/images/apple.png')} title={TEXT.CONTINUE_WITH_APPLE} />
      <SocialButton onPress={() => {}} imageSource={require('@/assets/images/google.png')} title={TEXT.CONTINUE_WITH_GOOGLE} />
      <SocialButton onPress={() => {  }} imageSource={require('@/assets/images/facebook.png')} title={TEXT.CONTINUE_WITH_FACEBOOK} />
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
  button: {
    width: '100%',
    backgroundColor:Colors.BUTTON,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
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
  errorText: {
    color: Colors.ERROR,
    marginBottom: 10,
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.BUTTON_DISABLED,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});