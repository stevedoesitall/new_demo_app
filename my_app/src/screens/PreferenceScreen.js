import React, { useReducer, useState } from "react";
import { Text, View, Switch, PickerIOS, Alert, FlatList, TouchableOpacity, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";
import allTopics from "../components/TopicsArray.js";
import Carnival from "react-native-carnival";

//Set a ListSub Var in ST for managing email prefs; do a get to check current email status

let currentAlertPrefs;
let currentPushPref;
let subs = [];

//This will run as sooon as the app is loaded and every time the preference center page is opened
const getFollowing = async () => {
  try {
    const value = await AsyncStorage.getItem("@following_topics");
    if (value) {
      const valueArray = value.split(",");
      if (valueArray.length > 0) {
        valueArray.forEach(topic => {
          if (!subs.includes(topic)) {
            subs.push(topic);
          }
        });
      }
    }
  } catch(e) {
    alert(`Something went wrong with getFollowing(): ${e}`);
  }
};

getFollowing();

const PreferenceScreen = () => {

  const currentTopicSubs = [];

  allTopics.forEach(topic => {
    if (subs.includes(topic)) {
      currentTopicSubs.push({name: topic, subStatus: true});
    }
    else {
      currentTopicSubs.push({name: topic, subStatus: false});
    }
  });

  const topicReducer = (state, action) => {
    switch (action.type) {
      case "subscribe":
        return state.map(topic => {
          if (topic.name == action.id) {
            return {...topic, subStatus: true}
          }
          else {
            return topic;
          }
      });
      case "unsubscribe":
          return state.map(topic => {
            if (topic.name == action.id) {
              return {...topic, subStatus: false}
            }
            else {
              return topic;
            }
      });
      default:
        return state;
    }
  };
  
  const [topics, dispatch] = useReducer(
    topicReducer, 
    currentTopicSubs
  );

  const storeFollowing = async (topic) => {
    if (!subs.includes(topic)) {
      subs.push(topic);
    }
    try {
      await AsyncStorage.setItem("@following_topics", (subs).toString());
    } catch (e) {
      alert(`Something went wrong with storeLTV(): ${e}`);
    }
    updateSubs(subs);
  };

  const removeFollowing = async (topic) => {
    subs = subs.filter(sub => sub != topic);
    try {
      await AsyncStorage.setItem("@following_topics", (subs).toString());
    } catch (e) {
      alert(`Something went wrong with storeLTV(): ${e}`);
    }
    updateSubs(subs);
  };

  const updateSubs = (value) => {
    const attrMap = new Carnival.AttributeMap();
    attrMap.setStringArray("following_topics", value);
    attrMap.setMergeRule(attrMap.MergeRules.Update);
    Carnival.setAttributes(attrMap).catch(error => {
      console.log(`Error setting device attributes: ${error}`);
    });
  };

  const changeStatus = (topic) => {
    if (topic.subStatus) {
      removeFollowing(topic.name);
    }
    else {
      storeFollowing(topic.name);
    }
    dispatch({ 
      type: topic.subStatus ? "unsubscribe" : "subscribe", 
      id: topic.name 
    });
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

  const getPrefsAndAlert = async () => {

    let values;

    try {
        values = await AsyncStorage.multiGet(["@alert_preferences", "@push_subscribed", "@following_topics"]);
    } catch(e) {
        alert(`Something went wrong with getPrefsAndAlert(): ${e}`);
    }  

      const userAlertValue = values[0][1];
      const userPushValue = values[1][1];

      if (userPushValue && userPushValue != "false") {
        currentPushPref = true;
      }
      else {
        currentPushPref = false;
      };

      if (userAlertValue) {
        currentAlertPrefs = userAlertValue;
      }
      else {
        currentAlertPrefs = "daily";
      };

      pushToggle(currentPushPref);
      alertToggle(currentAlertPrefs);
    };

  getPrefsAndAlert();

  const storeData = async (item, topic) => {
    try {
      await AsyncStorage.setItem(item, topic);
    } catch (e) {
      alert(`Something went wrong with storeData(): ${e}`);
    }
  };

  const [currentPushValue, pushToggle] = useState(currentPushPref);
  const [currentAlertValue, alertToggle] = useState(currentAlertPrefs);

  let prefMap = {};

  prefMap.push_subscribed = currentPushValue;
  prefMap.alert_prefs = currentAlertValue;

  const alertSwitch = (currentPushValue) => {

    const newValue = !currentPushValue;

    prefMap.push_subscribed = newValue;
    pushToggle(newValue);
    storeData("@push_subscribed", (newValue).toString());

    const attrMap = new Carnival.AttributeMap();
    attrMap.setBoolean("push_marketing_subscribed", newValue);
    Carnival.setAttributes(attrMap).catch(error => {
      console.log(`Error setting device attributes: ${error}`);
    });

    let successBlurb;

    if (prefMap.push_subscribed) {
      successBlurb = "You are now subscribed to push alerts."
    }
    else {
      successBlurb = "You are now unsubscribed from push alerts."
    }

    Alert.alert(
      "Success",
      successBlurb,
      [
        {
          text: "Dismiss"
        }
      ],
    );
  };

  const updatePrefs = (value) => {
    if (value != prefMap.alert_prefs) {
      prefMap.alert_prefs = value;
      alertToggle(value);
      storeData("@alert_preferences", (value).toString());
      
      Alert.alert(
        "Success",
        `Your preferences have been updated to ${value} notifications!`,
        [
          {
            text: "Dismiss"
          }
        ],
      );
      
    };

    const attrMap = new Carnival.AttributeMap();
    attrMap.setString("alert_preferences", value);
    Carnival.setAttributes(attrMap).catch(error => {
      console.log(`Error setting device attributes: ${error}`);
    });
  };

  let pickerStyle;
  let preferencesStyle;
  let listStyle;

  if (currentPushValue == true) {
    pickerStyle = styles.pickerStylesVisible;
    preferencesStyle = styles.preferencesStyleVisible;
    listStyle = styles.listStyleVisible;
  }
  else {
    pickerStyle = styles.pickerStylesHidden;
    preferencesStyle = styles.preferencesStyleHidden
    listStyle = styles.listStyleHidden;
  };

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Preference Center</Text>
    <Text style={styles.subhead}><Text style={styles.label}>Current Status:</Text> {currentPushValue ? "Subscribed" : "Unsubscribed"}</Text>
    
    <Switch
      style={styles.switcher}
      trackColor={{
        false: "rgb(102, 0, 0)",
        true: "rgb(0, 153, 0)"
      }}
      ios_backgroundColor="rgb(102, 0, 0)"
      value={currentPushValue}
      onValueChange={() => alertSwitch(currentPushValue)}
    />
    <Text style={preferencesStyle}>Manage Your Alert Frequency:</Text>

    <PickerIOS
      itemStyle={pickerStyle}
      selectedValue={currentAlertValue}
      onValueChange={(value) => updatePrefs(value)}
    >
      <PickerIOS.Item label="Daily" value="daily" />
      <PickerIOS.Item label="Weekly" value="weekly" />
      <PickerIOS.Item label="Realtime" value="realtime" />

    </PickerIOS>

    <Text style={preferencesStyle}>Select Topics to Follow:</Text>
    <FlatList
      style={listStyle}
      keyExtractor={(topic => {
        return topic.name
      })}
      data={topics}
      renderItem={( {item} ) => {
          return (
            <View style={styles.view}>
              <TouchableOpacity 
                onPress={() => changeStatus(item)}>
                  <Text style={item.subStatus ? styles.subButton : styles.unsubButton}>{capitalize(item.name)}</Text>
              </TouchableOpacity>
            </View>
          )
      }}
    />
  </View>
  );};

export default PreferenceScreen;