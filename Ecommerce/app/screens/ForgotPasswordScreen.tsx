import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TitleText } from "../../components/TitleText";
import { TEXT } from "../../constants/Text";
import { Button } from "../../components/Button";
import { NewTextInput } from "../../components/NewTextInput";
import { Colors } from "../../constants/Colors";

export default function ForgotPasswordScreen({
  navigation,
}: {
  navigation: any;
}) {
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
      <Button onPress={handleContinue} title={TEXT.CONTINUE} />
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
});
