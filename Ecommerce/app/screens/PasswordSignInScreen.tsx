import { StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { Text, View } from 'react-native'
import { TitleText } from '@/components/TitleText'
import { TEXT} from '@/constants/Text'
import { Button } from '@/components/Button'
import {Colors } from '../../constants/Colors'
import { NewTextInput } from '@/components/NewTextInput'

export default function PasswordSignInScreen({ route, navigation }: { route: any, navigation: any }) {
  const { email } = route.params;

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
      navigation.navigate('ShopScreen', { email, password });
  }
  const handleReset = () => {
      navigation.navigate('ForgotPasswordScreen');
  }
  
  return (
    <View style={styles.container}>
      <TitleText>{TEXT.SIGN_IN}</TitleText>
      <NewTextInput
        placeholder={TEXT.PASSWORD}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button onPress={handleContinue} title={TEXT.CONTINUE}
      disabled={password.length === 0} />
      <Text style={styles.signupText}>
        {TEXT.FORGOT_PASSWORD} <Text style={styles.signupLink} onPress={handleReset}>{TEXT.RESET}</Text>
      </Text>
    </View>
  );
}
//have differnt handler method

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BACKGROUND,
    paddingHorizontal: 20,
    paddingTop: 90,
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
    backgroundColor: Colors.BACKGROUND,
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
  errorText: {
    color: Colors.ERROR,
    marginBottom: 10,
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