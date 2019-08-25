import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../components/StyleSheet.js";
import { Base64 } from "js-base64";
 
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

const prodMode = true;

getUserKeys = (email) => {
  const userEmail = email;
  const userId = Base64.encode(email).substring(3,11).toUpperCase();
  // alert(`${userEmail}, ${userId}`);
  // Carnival.setUserEmail(email);
  // Carnival.setUserId(userId);
};

if (prodMode == true) {
  emailValidator = (nav, e) => {
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e))) {
      getUserKeys(e);
      nav.navigate("Home");
    }
    else {
      alert("You must provide a valid email address."); //Note: Add error styling
      return false;
    }
  };
}
else {
  emailValidator = (nav) => {
    nav.navigate("Home");
  }
};

export default LoginScreen;