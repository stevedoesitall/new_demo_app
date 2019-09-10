import React, { useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import { itemRecs, articleRecs, sectionIdCommerce, sectionIdMedia, itemURLs, articleURLs } from "../components/ItemFile.js";
import Carnival from "react-native-carnival";

// Add functionality to view impression, click, and pageview

const RecsScreen = () => {

  const [currentRecs, recsSetter] = useState(articleRecs);
  const [currentVertical, verticalSetter] = useState("Media");
  const [currentSectionId, sectionIdSetter] = useState(sectionIdMedia);
  const [currentURLs, URLsSetter] = useState(articleURLs);

  const updateState = (vertical) => {
    if (vertical == "Media") {
      recsSetter(articleRecs);
      sectionIdSetter(sectionIdMedia);
      URLsSetter(articleURLs);
    }
    else {
      recsSetter(itemRecs);
      sectionIdSetter(sectionIdCommerce);
      URLsSetter(itemURLs);
    }
    verticalSetter(vertical);
  };

  const trackPVsAndClicks = (url, tags, title) => {
    Carnival.trackPageview(url, tags);
    Carnival.trackClick(currentSectionId, url);
    alert(`Pageview and click recorded for ${title}`);
  };

  const trackImpression = () => {
    Carnival.trackImpression(currentSectionId, currentURLs);
    alert("Impression tracked!");
  };

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <Text style={styles.subhead}>Showing {currentVertical} Recommendations</Text>
    <View style={styles.buttonRow}>
      <TouchableOpacity
          onPress={() => trackImpression()}      
      >
        <Text style={[styles.textBlurb, styles.textButton]}>Track Impresssion</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
      <Text style={styles.textBlurb}>Swap: </Text>
      <TouchableOpacity
          onPress={() => updateState("Media")}      
      >
        <Text style={[styles.textBlurb, styles.textButton]}>Media</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => updateState("Commerce")}      
      >
        <Text style={[styles.textBlurb, styles.textButton]}>Commerce</Text>
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
              <TouchableOpacity
                onPress={() => trackPVsAndClicks(item.url, item.tags, item.title)}
              >
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
