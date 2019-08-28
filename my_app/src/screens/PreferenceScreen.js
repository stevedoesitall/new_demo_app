import React, { useState } from "react";
import { Text, View, Switch, Picker } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";

let currentAlertPrefs;
let currentPushPref;

const PreferenceScreen = () => {

  const getPrefData = async () => {
    try {
      const value = await AsyncStorage.getItem("@alert_preferences");
      if (value) {
        currentAlertPrefs = value;
      }
      else {
        currentAlertPrefs = "daily"
      }
    } catch(e) {
      alert("Something went wrong...")
    }
  };

  const getAlertData = async () => {
    try {
      const value = await AsyncStorage.getItem("@push_subscribed");
      if (value && value != false) {
        currentPushPref = true;
      }
      else {
        currentPushPref = false;
      }
    } catch(e) {
      alert("Something went wrong...")
    }
  };

  getAlertData();
  getPrefData();

  const storeData = async (item, newValue) => {
    try {
      await AsyncStorage.setItem(item, newValue);
    } catch (e) {
      alert("Something went wrong!");
    }
  }

  const [currentSwitchValue, switchValueToggle] = useState(currentPushPref);
  const [currentPickerValue, pickerValueToggle] = useState(currentAlertPrefs);

  let attrMap = {};
  // let attrMap = new Carnival.AttributeMap();

  attrMap.push_subscribed = currentSwitchValue;
  attrMap.alert_prefs = currentPickerValue;

  const alertSwitch = (currentSwitchValue) => {    
    const newValue = !currentSwitchValue;

    attrMap.push_subscribed = newValue;
    switchValueToggle(newValue);
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
      pickerValueToggle(value);
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

  if (currentSwitchValue == true) {
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
    <Text style={styles.subhead}>Hit the Switch to {currentSwitchValue ? "Unsubscribe" : "Subscribe"}</Text>
    
    <Switch
      style={styles.switcher}
      value={currentSwitchValue}
      onValueChange={() => alertSwitch(currentSwitchValue)}
    />
    <Text style={preferencesStyle}>How Often?</Text>

    <Picker
      style={pickerStyle}
      selectedValue={currentPickerValue}
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