import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

const PreferenceScreen = () => {
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Preference Center</Text>
    <Text style={styles.subhead}>Send Me Daily Alerts</Text>
    <Text style={styles.subhead}>Send Me Weekly Alerts</Text>
    <Text style={styles.subhead}>Send Me Realtime Alerts</Text>
  </View>
  );
};

export default PreferenceScreen;