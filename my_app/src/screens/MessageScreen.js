import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

const MessageScreen = () => {
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
    <Text style={styles.subhead}>Message #1 Placeholder [Delete, Mark Read]</Text>
    <Text style={styles.subhead}>Message #2 Placeholder [Delete, Mark Read]</Text>
    <Text style={styles.subhead}>Message #3 Placeholder [Delete, Mark Read]</Text>
  </View>
  );
};

export default MessageScreen;