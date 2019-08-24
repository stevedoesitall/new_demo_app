import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../components/StyleSheet.js";

const LoginScreen = (props) => {
  const nav = props.navigation;

  const [email, setEmail] = useState("");

  return (
    <View style={styles.view}>
    <Text style={styles.header}>Enter Your Email Address</Text>

    <TextInput 
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      value={email}
      onChangeText={(userEmail) => setEmail(userEmail)}
    />

    <Button
      title="Submit"
      onPress={() => emailValidator(nav, email)}
    />

  </View>
  );
};

const testingMode = false;

if (testingMode == true) {
  emailValidator = (nav, e) => {
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e))) {
      nav.navigate("Home");
    }
    else {
      alert("You must provide a valid email address.")
      return false;
    }
  };
}
else {
  emailValidator = (nav) => {
    nav.navigate("Home");
  }
};
//Add ternary for a non sailthru.com email after hitting the email button. Hook to an error CSS class

export default LoginScreen;