import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Keyboard } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";
import getDate from "../components/DateGenerator.js";
import { Base64 } from "js-base64";
import Carnival from "react-native-carnival";
import LinkingComp from "../components/Router.js";

const LoginScreen = (props) => {

  <LinkingComp/>

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
      keyboardType="email-address"
      value={email}
      onChangeText={(userEmail) => setEmail(userEmail)}
    />

    <TouchableOpacity
      onPress={() => emailValidator(nav, email)}
    >
      <Text style={styles.customButton}>Submit</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
          onPress={() => {
            storeUserData("", "");
            nav.navigate("Home");
          }}
        >
          <Text style={styles.textButtonLogin}>Or continue without logging in.</Text>
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
  const userId = Base64.encode(userEmail).substring(11,19).toUpperCase();
  const lastAppLoginDate = getDate();
  const profileVars = {
    "last_app_login_date" : lastAppLoginDate
  };


  storeUserData(userEmail, userId);
  getInstallDate();

  Carnival.setUserEmail(userEmail);
  Carnival.setUserId(userId);

  Carnival.setProfileVars(profileVars).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  });
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