import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const PurchaseScreen = () => {
  return (
  <View>
    <Text style={styles.text}>Add or Buy</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default PurchaseScreen;