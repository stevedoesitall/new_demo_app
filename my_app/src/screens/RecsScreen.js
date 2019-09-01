import React, { useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import { testSectionCommerce, testSectionMedia } from "../components/ItemFile.js";

// May be a good use of SectionList
// https://facebook.github.io/react-native/docs/sectionlist

// Add functionality to view impression, click, and pageview

const RecsScreen = () => {

  const [vertical, setVertical] = useState("Commerce");
  const [algorithm, setAlgo] = useState("Interest");

  let testSection;
  let blurb;

  if (vertical == "Commerce") {
    testSection = testSectionCommerce;
    blurb = "View Item";
  }
  else if (vertical == "Media") {
    testSection = testSectionMedia;
    blurb = "View Article";
  };

  const testSectionJSON = JSON.parse(testSection).recommendations;

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.subhead}>Showing {vertical} {algorithm} Recs</Text>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Choose Algorithm:</Text>
        <TouchableOpacity
          onPress={() => {
            setAlgo("Interest");
          }}
        >
          <Text style={styles.textButton}>Interest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAlgo("Random");
          }}
        >
          <Text style={styles.textButton}>Random</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
        <Text style={styles.label}>Choose Vertical:</Text>
        <TouchableOpacity
          onPress={() => {
            setVertical("Media");
          }}
        >
          <Text style={styles.textButton}>Media</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVertical("Commerce");
          }}
        >
          <Text style={styles.textButton}>Commerce</Text>
        </TouchableOpacity>
    </View>
    <FlatList
      keyExtractor={(testItem) => {
        return testItem.url;
      }}
      data={testSectionJSON}
      renderItem={( {item} ) => {
        return (
          <View>
            <Text style={styles.recTitle}>{item.title}</Text>
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
