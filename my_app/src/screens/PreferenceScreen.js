import React, { useState } from "react";
import { Text, View, Switch, Picker } from "react-native";
import styles from "../components/StyleSheet.js";

const PreferenceScreen = () => {

  // Use locally stored device attributes to autopopulate useState and the attrMap
  const [currentSwitchValue, switchValueToggle] = useState(true);
  const [currentPickerValue, pickerValueToggle] = useState("daily");

  let attrMap = {};
  // let attrMap = new Carnival.AttributeMap();

  attrMap.push_subscribed = currentSwitchValue;
  attrMap.alert_prefs = currentPickerValue;

  const alertSwitch = (currentSwitchValue) => {    

    switchValueToggle(!currentSwitchValue);

    attrMap.push_subscribed = !currentSwitchValue;

    alert(`${attrMap.push_subscribed ? "You are now subscribed to push alerts." : "You are now unsubscribed from push alerts."}`);

    // attrMap.setBoolean("push_subscribed", value);
    // Carnival.setAttributes(attrMap).catch(e => {
      // Handle error
    // });

  };

  const updatePrefs = (value) => {
    if (value != attrMap.alert_prefs) {
      attrMap.alert_prefs = value;
      alert(`Your preferences have been updated to ${attrMap.alert_prefs} notifications!`);
      pickerValueToggle(value);
    }
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
      onValueChange={() => alertSwitch(currentSwitchValue)}
      value={currentSwitchValue}
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