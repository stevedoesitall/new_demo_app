import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";
import { FlatList } from "react-native-gesture-handler";

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
        return rating.name;
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

triggerEvent = (rating) => {
  const eventName = "AppRated";
  const eventVars = {};
  eventVars["rating"] = rating.value;
  
  alert(`${eventName} ${eventVars.rating}`);
};

export default EventScreen;