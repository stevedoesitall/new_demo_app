import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const HomeScreen = (props) => {
  const nav = props.navigation;
  return (
  <View>
    <Text style={styles.text}>Hello!</Text>
    <Button 
      title="Your Message Center"
      onPress={() => nav.navigate("Messages")}
    />
    <Button 
      title="Your Preference Center"
      onPress={() => nav.navigate("Preferences")}
    />
    <Button 
      title="Make a Purchase"
      onPress={() => nav.navigate("Purchase")}
    />
    <Button 
      title="Recommended for You"
      onPress={() => nav.navigate("Recs")}
    />
    <Button 
      title="Rate the App"
      onPress={() => nav.navigate("Event")}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;