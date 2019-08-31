import React, { useState } from "react";
import { Text, View, Switch, PickerIOS, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";

let currentAlertPrefs;
let currentPushPref;

//Set a ListSub Var in ST for managing email prefs; do a get to check current email status

const PreferenceScreen = () => {

  getPrefsAndAlert = async () => {

    let values
    try {
        values = await AsyncStorage.multiGet(["@alert_preferences", "@push_subscribed"]);
    } catch(e) {
        alert(`Something went wrong with getPrefsAndAlert(): ${e}`);
    }
    console.log(values)
  
        const userAlertValue = values[0][1];
        const userPushValue = values[1][1];

        if (userPushValue && userPushValue != false) {
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

  const storeData = async (item, newValue) => {
    try {
      await AsyncStorage.setItem(item, newValue);
    } catch (e) {
      alert(`Something went wrong with storeData(): ${e}`);
    }
  };

  const [currentPushValue, pushToggle] = useState(currentPushPref);
  const [currentAlertValue, alertToggle] = useState(currentAlertPrefs);

  let attrMap = {};
  // let attrMap = new Carnival.AttributeMap();

  attrMap.push_subscribed = currentPushValue;
  attrMap.alert_prefs = currentAlertValue;

  const alertSwitch = (currentPushValue) => {    
    const newValue = !currentPushValue;

    attrMap.push_subscribed = newValue;
    pushToggle(newValue);
    storeData("@push_subscribed", newValue);

    let successBlurb;

    if (attrMap.push_subscribed) {
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

    // attrMap.setBoolean("push_subscribed", value);
    // Carnival.setAttributes(attrMap).catch(e => {
      // Handle error
    // });
  };

  const updatePrefs = (value) => {
    if (value != attrMap.alert_prefs) {
      attrMap.alert_prefs = value;
      alertToggle(value);
      storeData("@alert_preferences", value);
      
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

    // attrMap.setString("alert_preferences", value);
    // Carnival.setAttributes(attrMap).catch(e => {
      // Handle error
    // });
  };

  let pickerStyle;
  let preferencesStyle;

  if (currentPushValue == true) {
    pickerStyle = styles.pickerStylesVisible;
    preferencesStyle = styles.preferencesStyleVisible;
  }
  else {
    pickerStyle = styles.pickerStylesHidden;
    preferencesStyle = styles.preferencesStyleHidden
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
      // thumbColor="rgb(102, 0, 0)"
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
  </View>
  );
};

export default PreferenceScreen;