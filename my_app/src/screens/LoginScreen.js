import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../components/StyleSheet.js";
import getDate from "../components/DateGenerator.js";
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

const prodMode = false;

const getUserKeys = (email) => {
  const userEmail = email;
  const userId = Base64.encode(email.toLowerCase()).substring(3,11).toUpperCase();
  const lastAppLoginDate = getDate();
  const profileVars = {
    "last_app_login_date" : lastAppLoginDate
  };

  alert(`You are logged in. Your user ID is: ${userId}`);

  // Carnival.setUserEmail(userEmail);
  // Carnival.setUserId(userId);
  // Carnival.setProfileVars(profileVars).then(result => {
  //   // Handle success
  // }).catch(e => {
  //   // Handle error
  // });

};

const emailValidator = (nav, email) => {
  if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    getUserKeys(email);
  }
  else {
    alert("You must provide a valid email address."); //Note: Add error styling
    if (prodMode == true) {
      return false;
    }
  }
  nav.navigate("Home");
};

export default LoginScreen;