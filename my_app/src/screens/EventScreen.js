import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";

const EventScreen = () => {

  const ratings = [
    {value: 5, name: "Excellent", style: "excellentButton"},
    {value: 4, name: "Above Average", style: "aboveAverageButton"},
    {value: 3, name: "Average", style: "averageButton"},
    {value: 2, name: "Below Average", style: "belowAverageButton"},
    {value: 1, name: "Poor", style: "resetButton"}
  ];

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Rate the App</Text>
    <FlatList
      keyExtractor={(rating) => {
        return rating.value.toString();
      }}
      data={ratings}
      renderItem={( {item} ) => {
        return (

        <TouchableOpacity onPress={() => triggerEvent(item)}>
            <Text style={styles[item.style]}>{item.name}</Text>
        </TouchableOpacity>
          
        );
      }}
    />
  </View>
  );
};

const triggerEvent = (rating) => {
  const eventName = "AppRated";
  const eventVars = {};
  eventVars["rating"] = rating.value;
  
  alert(`Event: ${eventName}, Value: ${eventVars.rating}`);
};

export default EventScreen;