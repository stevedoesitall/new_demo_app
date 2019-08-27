import React from "react";
import { Text, View, Button, Image } from "react-native";
import styles from "../components/StyleSheet.js";

const HomeScreen = (props) => {
  const nav = props.navigation;
  return (
  <View style={styles.view}>
    <Text style={styles.header}>Hello!</Text>
    {/* <Image
      style={styles.logoImage}
      resizeMode="contain"
      source={require("../../assets/sailthru-logo.png")}
    /> */}
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

// const getDeviceId = () => {
//   Carnival.getDeviceID().then(function(deviceID) {
//     // Handle device ID
//   }, function(error){
//       // Handle error
//   });
// };

// getDeviceId();

export default HomeScreen;