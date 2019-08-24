import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const RecsScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Recommended for You</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default RecsScreen;
