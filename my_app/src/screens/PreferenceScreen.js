import React, { useState } from "react";
import { Text, View, Switch, Picker } from "react-native";
import styles from "../components/StyleSheet.js";

const PreferenceScreen = () => {

  //Use either Sailthru vars or device attributes to autopopulate useState and the attrMap
  const [currentSwitchValue, switchValueToggle] = useState(true);
  const [currentPickerValue, pickerValueToggle] = useState("daily");

  let attrMap = {};
  // let attrMap = new Carnival.AttributeMap();

  attrMap.push_subscribed = currentSwitchValue;
  attrMap.alert_prefs = currentPickerValue;

  const alertSwitch = (currentSwitchValue) => {    

    switchValueToggle(!currentSwitchValue);

    attrMap.push_subscribed = !currentSwitchValue;

    alert(`${attrMap.push_subscribed ? "You've been subscribed to push alerts." : "You are now unsubscribed from push alerts."}`);

    // attrMap.setString("push_subscribed", value);
    // Carnival.setAttributes(attrMap).catch(e => {
      // Handle error
    // });

  };

  const updatePrefs = (value) => {
    attrMap.alert_prefs = value;

    alert(`Your preferences have been updated to ${attrMap.alert_prefs} notifications!`);
    pickerValueToggle(value);

    // attrMap.setString("alert_preferences", value);
    // Carnival.setAttributes(attrMap).catch(e => {
      // Handle error
    // });
  };

  let pickerStyle;

  if (currentSwitchValue == true) {
    pickerStyle = styles.pickerStylesVisible;
  }
  else {
    pickerStyle = styles.pickerStylesHidden;
  };

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Preference Center</Text>
    <Switch
      onValueChange={() => alertSwitch(currentSwitchValue)}
      value={currentSwitchValue}
    />
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