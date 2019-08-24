import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

const MessageScreen = () => {
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
  </View>
  );
};

export default MessageScreen;