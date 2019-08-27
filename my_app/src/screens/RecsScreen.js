import React, { useState } from "react";
import { Text, View, Button, Image, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";
import { testSectionCommerce, testSectionMedia } from "../components/ItemFile.js";

// May be a good use of SectionList
// https://facebook.github.io/react-native/docs/sectionlist

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
            <Button
              title={blurb}
            />
          </View>
        );
      }}
    />
  </View>
  );
};

export default RecsScreen;
