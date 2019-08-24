import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const MessageScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Your Message Center</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default MessageScreen;