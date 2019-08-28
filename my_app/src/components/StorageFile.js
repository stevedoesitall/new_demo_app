import AsyncStorage from "@react-native-community/async-storage";

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

export { getAlertData, getPrefData };