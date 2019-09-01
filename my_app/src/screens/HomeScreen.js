import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("Messages")}
    >
      <Text style={styles.customButton}>Your Message Center</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("Preferences")}
    >
      <Text style={styles.customButton}>Your Preference Center</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("Purchase")}
    >
      <Text style={styles.customButton}>Make a Purchase</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("Recs")}
    >
      <Text style={styles.customButton}>Recommended for You</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("About")}
    >
      <Text style={styles.customButton}>Account Information</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.toHome}
      onPress={() => nav.navigate("Event")}
    >
      <Text style={styles.customButton}>Rate the App</Text>
    </TouchableOpacity>

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