import { StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { TitleText } from "../../components/TitleText";
import { TEXT } from "../../constants/Text";
import { Button } from "../../components/Button";
import { Colors } from "../../constants/Colors";

export default function EmailForResetPasswordScreen({
  navigation,
}: {
  navigation: any;
}) {
  const handleReturn = () => {
    navigation.navigate("SignInScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Image
          style={styles.socialIcon}
          source={require("@/assets/images/sent.png")}
        />
      </View>
      <TitleText>{TEXT.SENT_EMAIL}</TitleText>
      <View style={styles.centerContainer}>
        <Button onPress={handleReturn} title={TEXT.RETURN_LOGIN} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: 24,
    paddingTop: 90,
  },
  centerContainer: {
    alignItems: "center",
  },
  socialIcon: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
});
