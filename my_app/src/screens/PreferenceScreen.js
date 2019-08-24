import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const PreferenceScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Your Preference Center</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default PreferenceScreen;