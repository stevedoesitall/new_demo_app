import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";
import MessageDetails from "../components/MessageComp.js";

const MessageScreen = () => {

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
      <MessageDetails
      />
  </View>
  );
};

export default MessageScreen;