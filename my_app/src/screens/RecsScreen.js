import React, { useState } from "react";
import { Text, View, Button, Image, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";

// May be a good use of SectionList
// https://facebook.github.io/react-native/docs/sectionlist

const RecsScreen = () => {
  const [vertical, setVertical] = useState("Commerce");
  const [algorithm, setAlgo] = useState("Interest");

  const testSectionCommerce = '{"recommendations": [{"url":"http://example.com/hat", "title":"Hat", "image":"https://images.freeimages.com/images/large-previews/420/black-hat-1417068.jpg"}, {"url":"http://example.com/shoes", "title":"Shoes", "image":"https://images.freeimages.com/images/large-previews/64b/shoes-1555048.jpg"}, {"url":"http://example.com/pants", "title":"Pants", "image":"https://images.freeimages.com/images/large-previews/728/jeans-1421398.jpg"}]}';

  const testSectionMedia = '{"recommendations": [{"url":"http://example.com/politics", "title":"Politics", "image":"https://images.freeimages.com/images/large-previews/4f2/german-reichstag-1515628.jpg"}, {"url":"http://example.com/tech", "title":"Tech", "image":"https://images.freeimages.com/images/large-previews/2c2/hi-tech-1-1554527.jpg"}, {"url":"http://example.com/entertainment", "title":"Entertainment", "image":"https://images.freeimages.com/images/large-previews/587/disco-ball-1421094.jpg"}]}';

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
