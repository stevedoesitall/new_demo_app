import React from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import { articleRecs } from "../components/ItemFile.js";

// Add functionality to view impression, click, and pageview

const RecsScreen = () => {

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Recommended for You</Text>
    <FlatList
      keyExtractor={(title) => {
        return title.url;
      }}
      data={articleRecs}
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
                  <Text style={styles.belowAverageButton}>View Article</Text>
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
