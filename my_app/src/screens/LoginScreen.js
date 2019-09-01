import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, Keyboard } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";
import getDate from "../components/DateGenerator.js";
import { Base64 } from "js-base64";
 
const LoginScreen = (props) => {

  const nav = props.navigation;

  const [email, setEmail] = useState("");

  return (
    <View style={styles.view}>
    <Text style={styles.header}>Enter Your Email</Text>

    <TextInput 
      placeholder="email@example.com"
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      value={email}
      onChangeText={(userEmail) => setEmail(userEmail)}
    />

    {/* <Button
      title="Submit"
      onPress={() => emailValidator(nav, email)}
    /> */}

    <TouchableOpacity
      onPress={() => emailValidator(nav, email)}
    >
      <Text style={styles.customButton}>Submit</Text>
    </TouchableOpacity>

  </View>
  );
};

const prodMode = true;

const storeUserData = async (userEmail, userId) => {
  const userIdPair = ["@user_id", userId];
  const userEmailPair = ["@user_email", userEmail];

  try {
    await AsyncStorage.multiSet([userEmailPair, userIdPair]);
  } catch (e) {
    alert(`Something went wrong with storeLTV(): ${e}`);
  }
};

const getInstallDate = async () => {
  try {
    const value = await AsyncStorage.getItem("@app_install_date");
    if (!value) {
      storeInstallDate();
    }
  } catch(e) {
    alert(`Something went wrong with getInstallDate(): ${e}`);
  }
};

const storeInstallDate = async () => {
  try {
    await AsyncStorage.setItem("@app_install_date", getDate());
  } catch (e) {
    alert(`Something went wrong with storeLTV(): ${e}`);
  }
};

const getUserKeys = (email) => {
  const userEmail = email.toLowerCase();
  const userId = Base64.encode(userEmail).substring(3,11).toUpperCase();
  const lastAppLoginDate = getDate();
  const profileVars = {
    "last_app_login_date" : lastAppLoginDate
  };

  if (prodMode == true) {

    // const successBlurb = `You are now logged in. Your User ID is ${userId}.`;

    // Alert.alert(
    //   "Thank You",
    //   successBlurb,
    //   [
    //     {
    //       text: "Dismiss",
    //       onPress: () => Keyboard.dismiss()
    //     }
    //   ],
    // );
  };

  storeUserData(userEmail, userId);
  getInstallDate();

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
    if (prodMode == true) {
      alert("You must provide a valid email address."); //Note: Add error styling
      return false;
    }
  }
  Keyboard.dismiss();
  nav.navigate("Home");
};

export default LoginScreen;