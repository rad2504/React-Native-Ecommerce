import { StyleSheet } from 'react-native';
import {  View } from 'react-native';
import { TitleText } from '../../components/TitleText'
import { TEXT} from '../../constants/Text'
import { Button } from '../../components/Button'
import { NewTextInput } from '../../components/NewTextInput'
import {Colors } from '../../constants/Colors'



export default function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const handleContinue = () => {
    navigation.navigate("EmailForResetPasswordScreen");
  };
  return (
    <View style={styles.container}>
       <TitleText>{TEXT.FORGOT_PASSWORD}</TitleText>
      <NewTextInput
        placeholder={TEXT.ENTER_EMAIL}
        keyboardType="email-address"
        autoCapitalize="none"
      />
       <Button onPress={handleContinue} title={TEXT.CONTINUE}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
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
    backgroundColor: Colors.INPUT_BACKGROUND,
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
});