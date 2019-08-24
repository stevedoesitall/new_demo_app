import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const EventScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Rate the App</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default EventScreen;