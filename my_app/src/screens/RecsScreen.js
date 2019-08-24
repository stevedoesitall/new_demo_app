import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

const RecsScreen = () => {
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.rec}>Item #1 Placeholder</Text>
    <Text style={styles.rec}>Item #2 Placeholder</Text>
    <Text style={styles.rec}>Item #3 Placeholder</Text>
  </View>
  );
};

export default RecsScreen;
