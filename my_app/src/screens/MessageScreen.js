import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

// Follow this doc on how to implement a Message Stream: 
// https://docs.mobile.sailthru.com/docs/developing-a-custom-message-stream

const MessageScreen = () => {
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
    <Text style={styles.subhead}>Message #1 [Delete, Mark Read]</Text>
    <Text style={styles.subhead}>Message #2 [Delete, Mark Read]</Text>
    <Text style={styles.subhead}>Message #3 [Delete, Mark Read]</Text>
  </View>
  );
};

export default MessageScreen;