import React from "react";
import { Text, View, TouchableOpacity, FlatList, Alert, ScrollView } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

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
    <ScrollView
        scrollEnabled={false}
      >
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
    </ScrollView>
  </View>
  );
};

const triggerEvent = (rating) => {
  const ratingName = rating.name.toLowerCase();
  const eventName = "AppRated";
  const eventVars = {};
  eventVars["rating"] = rating.value;
  
  const successBlurb = `Your rating of ${ratingName} has been recorded.`;

  Alert.alert(
    "Thank You",
    successBlurb,
    [
      {
        text: "Dismiss"
      }
    ],
  );

  Carnival.logEvent(eventName, eventVars);
};

export default EventScreen;