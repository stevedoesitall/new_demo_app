import React from "react";
import { Text, View, Button, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";

const EventScreen = () => {

  const ratings = [
    {value: 5, name: "Excellent"},
    {value: 4, name: "Above Average"},
    {value: 3, name: "Average"},
    {value: 2, name: "Below Average"},
    {value: 1, name: "Poor"}
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
          <Button
            title={item.name}
            onPress={() => triggerEvent(item)}
          />
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