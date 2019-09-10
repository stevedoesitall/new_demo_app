import React, { useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import { itemRecs, articleRecs } from "../components/ItemFile.js";

// Add functionality to view impression, click, and pageview

const RecsScreen = () => {

  const [currentRecs, recsSetter] = useState(articleRecs);
  const [currentVertical, verticalSetter] = useState("Media");

  const updateState = (vertical) => {
    if (vertical == "Media") {
      recsSetter(articleRecs);
    }
    else {
      recsSetter(itemRecs);
    }
    verticalSetter(vertical);
  };

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.subhead}>Showing {currentVertical} Recommendations</Text>
    <View style={styles.buttonRow}>
      <TouchableOpacity
          onPress={() => updateState("Media")}      
      >
        <Text style={styles.textButton}>Media</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => updateState("Commerce")}      
      >
        <Text style={styles.textButton}>Commerce</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      keyExtractor={(title) => {
        return title.url;
      }}
      data={currentRecs}
      extraData={this.state}
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
                  <Text style={styles.belowAverageButton}>View {currentVertical == "Media" ? "Article" : "Item"}</Text>
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
