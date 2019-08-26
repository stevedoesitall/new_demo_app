import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";

const RecsScreen = () => {
  const [vertical, setVertical] = useState("Commerce");
  const [algorithm, setAlgo] = useState("Interest");

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.subhead}>Showing {vertical} {algorithm} Recs</Text>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Choose Algorithm:</Text>
        <Button
          title="Interest"
          onPress={() => {
            setAlgo("Interest");
          }}
        />
        <Button
          title="Random"
          onPress={() => {
            setAlgo("Random");
          }}
        />
    </View>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Choose Vertical:</Text>
        <Button
          title="Media"
          onPress={() => {
            setVertical("Media");
          }}
        />
        <Button
          title="Commerce"
          onPress={() => {
            setVertical("Commerce");
          }}
        />
    </View>
    <Text style={styles.subhead}>Item #1 Placeholder</Text>
    <Text style={styles.subhead}>Item #2 Placeholder</Text>
    <Text style={styles.subhead}>Item #3 Placeholder</Text>
  </View>
  );
};

export default RecsScreen;
