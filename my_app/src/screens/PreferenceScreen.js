import React, { useState } from "react";
import { Text, View, Switch, Picker } from "react-native";
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
    alert(`${attrMap.push_subscribed ? "You are now subscribed to push alerts." : "You are now unsubscribed from push alerts."}`);

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
      alert(`Your preferences have been updated to ${value} notifications!`);
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
    <Text style={styles.subhead}>Hit the Switch to {currentPushValue ? "Unsubscribe" : "Subscribe"}</Text>
    
    <Switch
      style={styles.switcher}
      value={currentPushValue}
      onValueChange={() => alertSwitch(currentPushValue)}
    />
    <Text style={preferencesStyle}>How Often?</Text>

    <Picker
      style={pickerStyle}
      selectedValue={currentAlertValue}
      onValueChange={(value) => updatePrefs(value)}
    >
      <Picker.Item label="Daily" value="daily" />
      <Picker.Item label="Weekly" value="weekly" />
      <Picker.Item label="Realtime" value="realtime" />

    </Picker>
  </View>
  );
};

export default PreferenceScreen;