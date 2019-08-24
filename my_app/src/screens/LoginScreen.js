import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const LoginScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Login</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default LoginScreen;