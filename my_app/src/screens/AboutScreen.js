import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";
import tierMap from "../components/TierMap.js";

const topLevel = "Diamond";
let userLTV;
let appInstallDate;
let userTier = "Bronze";
let currentAlertPrefs;
let currentPushPref;
let userId;
let userEmail;
let membershipHex;

//Note to add a ST var for list status and display newsletter preference module

const AboutScreen = () => {

    const resetStatus = async () => {
        const userLTVPair = ["@user_ltv", 0];
        const userTierPair = ["@user_tier", "Bronze"];
        const userAlertPair = ["@alert_preferences", "daily"];
        const userPrefPair = ["@push_subscribed", false];
        const userIdPair = ["@user_id", ""];
        const userEmailPair = ["@user_email", ""];
        const userAppInstallDate = ["@app_install_date", ""];

        try {
          await AsyncStorage.multiSet([userLTVPair, userTierPair, userAlertPair, userPrefPair, userEmailPair, userIdPair, userAppInstallDate]);
          setMembershipTier("Bronze");
          lifetimeValueTicker(0);
          pushToggle(true);
          alertToggle("daily");
          setId("EXAMPLEID");
          setEmail("email@example.com");
          setAppInstallDate("UNKNOWN");

        } catch (e) {
          alert(`Something went wrong with resetStatus(): ${e}`);
        }
      };

      getUserData = async () => {

        let values
        try {
            values = await AsyncStorage.multiGet(["@alert_preferences", "@push_subscribed", "@user_id", "@user_email", "@app_install_date"]);
        } catch(e) {
            alert(`Something went wrong with getUserData(): ${e}`);
        }
        console.log(values)
      
            const userAlertValue = values[0][1];
            const userPushValue = values[1][1];
            const userIdValue = values[2][1];
            const userEmailValue = values[3][1];
            const appInstallDateValue = values[4][1];

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

            if (userIdValue) {
                userId = userIdValue;
            }
            else {
                userId = "EXAMPLEID";
            };

            if (userEmailValue) {
                userEmail = userEmailValue;
            }
            else {
                userEmail = "email@example.com";
            };

            if (appInstallDateValue) {
                appInstallDate = appInstallDateValue;
            }
            else {
                appInstallDate = "Unknown";
            };

            const capitalizedPrefs = currentAlertPrefs.charAt(0).toUpperCase() + currentAlertPrefs.slice(1);

            pushToggle(currentPushPref);
            alertToggle(capitalizedPrefs);
            setId(userId);
            setEmail(userEmail);
            setAppInstallDate(appInstallDate);
        };

      getLtvAndTier = async () => {

        let values;

        try {
          values = await AsyncStorage.multiGet(["@user_tier", "@user_ltv"]);
        } catch(e) {
          alert(`Something went wrong with getLtvAndTier(): ${e}`)
        }

        const userTierValue = values[0][1];
        const userLtvValue = values[1][1];

        if (userTierValue) {
            userTier = userTierValue;
        }
        setMembershipTier(userTier);

        if (userLtvValue) {
            userLTV = userLtvValue;
        }
        lifetimeValueTicker(userLTV);
 
        if (userTier != topLevel) {

            for (let pos = 0; pos < tierMap.length; pos++) {
                if (tierMap[pos].status == userTier) {
                    setMembershipHex(tierMap[pos].hex);
                    setNextLevel(tierMap[pos-1].status);
                    setPointsToNextLevel(Math.round(tierMap[pos-1].points - userLTV/100));
                    break;
                }
            };
        }
        else {
            setMembershipHex(tierMap[0].hex);
        }
      }

      getLtvAndTier();
      getUserData();

    const [currentPushValue, pushToggle] = useState(currentPushPref);
    const [currentAlertValue, alertToggle] = useState(currentAlertPrefs);
    const [lifetimeValue, lifetimeValueTicker] = useState(0);
    const [membershipTier, setMembershipTier] = useState(userTier);
    const [currentMembershipHex, setMembershipHex] = useState(membershipHex);
    const [pointsToNextLevel, setPointsToNextLevel] = useState(0);
    const [nextLevel, setNextLevel] = useState("Bronze");
    const [currentUserId, setId] = useState(userId);
    const [currentUserEmail, setEmail] = useState(userEmail);
    const [currentAppInstallDate, setAppInstallDate] = useState(userEmail);

    return (

    <View style={styles.view}>
        <Text style={styles.header}>Account Information</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Your User ID: </Text> 
        {currentUserId}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Your Email: </Text> 
        {currentUserEmail}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>App Install Date: </Text> 
        {currentAppInstallDate}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Push Enabled: </Text> 
        {currentPushValue ? "Yes" : "No"}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Alert Frequency: </Text> 
        {currentPushValue ? currentAlertValue : "N/A"}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Total Purchase Amount: </Text> 
        ${(lifetimeValue/100).toFixed(2)}</Text>
        <Text style={styles.subhead}>
            <Text style={styles.label}>Membership Tier: </Text>
            <Text style={{color: currentMembershipHex}}>{membershipTier}</Text>
            </Text>
        {userTier != topLevel ? 
        <Text style={styles.subhead}>
            <Text style={styles.label}>Points to {nextLevel} Tier: </Text> 
        {(lifetimeValue > 0) ? (pointsToNextLevel + 1) : 100}</Text>
        : null
        }
        <Button
            title="Reset Your Status"
            onPress={() => {
                resetStatus();
            }}
        />
    </View>
    );
};

export default AboutScreen;