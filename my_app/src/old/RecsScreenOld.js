import React, { useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

// Add functionality to view impression, click, and pageview

const RecsScreen = () => {

  const [currentRecs, recsSetter] = useState("");

  let sectionID = "0af7e114-d038-11e9-b727-002590d1a2f6";
  

  const getRecs = (sectionID) => {
    Carnival.getRecommendations(sectionID).then(function(recs) {
      recsSetter(recs);
    }, function(err) {
      alert(err);
    });
  };

  getRecs(sectionID);

  const [vertical, setVertical] = useState("Media");
  const [algorithm, setAlgo] = useState("Interest");

  let blurb;

  if (vertical == "Commerce") {
    sectionID = "fc2b679a-d0bf-11e9-a006-002590d1a41a";
    blurb = "View Item";
  }
  else if (vertical == "Media") {
    sectionID = "0af7e114-d038-11e9-b727-002590d1a2f6";
    blurb = "View Article";
  };

  // const testSectionJSON = JSON.parse(testSection).recommendations;

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.subhead}>Showing {vertical} {algorithm} Recs</Text>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Algorithm:</Text>
        <TouchableOpacity
          onPress={() => {
            setAlgo("Interest");
          }}
        >
          <Text style={styles.textButton}>Interest</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity
          onPress={() => {
            setAlgo("Random");
          }}
        >
          <Text style={styles.textButton}>Random</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Vertical:</Text>
        <TouchableOpacity
          onPress={() => {
            setVertical("Media");
          }}
        >
          <Text style={styles.textButton}>Media</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity
          onPress={() => {
            setVertical("Commerce");
          }}
        >
          <Text style={styles.textButton}>Commerce</Text>
        </TouchableOpacity>
    </View>
    <FlatList
      keyExtractor={(title) => {
        return title.url;
      }}
      data={currentRecs}
      renderItem={( {item} ) => {
        return (
          <View>
            <Text style={styles.recTitleTwo}>{item.title}</Text>
            <Image
                style={styles.recImage}
                source={{uri: item.image}}
                resizeMode="contain"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity>
                  <Text style={styles.belowAverageButton}>{blurb}</Text>
              </TouchableOpacity>
              </View>
          </View>
        );
      }}
    />
  </View>
  );
};

export default RecsScreen;
