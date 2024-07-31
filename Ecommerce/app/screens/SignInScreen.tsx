import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TEXT } from "../../constants/Text";
import { Button } from "../../components/Button";
import { SocialButton } from "../../components/SocialButton";
import { TitleText } from "../../components/TitleText";
import { NewTextInput } from "../../components/NewTextInput";
import { Colors } from "../../constants/Colors";

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = (text: string) => {
    setEmail(text);

    if (text.trim() === "") {
      setError("");
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setError(TEXT.ERROR_INVALID_EMAIL);
      } else {
        setError("");
      }
    }
  };
  const handleContinue = () => {
    if (!email) {
    } else if (error) {
      setError(TEXT.ERROR_EMAIL_REQUIRED);
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
      <Button
        onPress={handleContinue}
        title={TEXT.CONTINUE}
        disabled={!email || !!error}
      />

      <Text style={styles.signupText}>
        {TEXT.DONOT_HAVE_ACCOUNT}{" "}
        <Text style={styles.signupLink} onPress={handleCreate}>
          {TEXT.CREATE_ONE}
        </Text>
      </Text>
      <SocialButton
        onPress={() => {}}
        imageSource={require("@/assets/images/apple.png")}
        title={TEXT.CONTINUE_WITH_APPLE}
      />
      <SocialButton
        onPress={() => {}}
        imageSource={require("@/assets/images/google.png")}
        title={TEXT.CONTINUE_WITH_GOOGLE}
      />
      <SocialButton
        onPress={() => {}}
        imageSource={require("@/assets/images/facebook.png")}
        title={TEXT.CONTINUE_WITH_FACEBOOK}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: "center",
    padding: 20,
  },
  signupText: {
    color: Colors.BLACK,
    marginBottom: 70,
    fontSize: 14,
  },
  signupLink: {
    color: Colors.BLACK100,
    fontWeight: "bold",
  },
  errorText: {
    color: Colors.TOGGLE_ICON_ERROR,
    marginBottom: 10,
  },
});
