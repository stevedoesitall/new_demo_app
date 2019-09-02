import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "../components/StyleSheet.js";
import tierMap from "../components/TierMap.js";

//Note to add a ST var for list status and display newsletter preference module

const topLevel = "Diamond";
let userLTV;
let appInstallDate;
let userTier = "Bronze";
let currentAlertPrefs;
let currentPushPref;
let userId;
let userEmail;
let membershipHex;
let followingTopics;
let pleaseReset;
let subs = [];

const AboutScreen = () => {

    const getFollowing = async () => {
        try {
          const value = await AsyncStorage.getItem("@following_topics");
          if (value) {
            subs = [];
            const valueArray = value.split(",");
            if (valueArray.length > 0) {
              valueArray.forEach(topic => {
                if (!subs.includes(topic)) {
                  subs.push(topic);
                }
              });
            }
          }
          else {
            subs = [];
          }
        } catch(e) {
          alert(`Something went wrong with getFollowing(): ${e}`);
        }
      };

    getFollowing();

    // const topicReducer = (state, action) => {
    //     switch (action.type) {
    //       case "subscribe":
    //         return state.map(topic => {
    //           if (topic.name == action.id) {
    //             return {...topic, subStatus: true}
    //           }
    //           else {
    //             return topic;
    //           }
    //       });
    //       case "unsubscribe":
    //           return state.map(topic => {
    //             if (topic.name == action.id) {
    //               return {...topic, subStatus: false}
    //             }
    //             else {
    //               return topic;
    //             }
    //       });
    //       default:
    //         return state;
    //     }
    //   };
      
    //   const [topics, dispatch] = useReducer(
    //     topicReducer, 
    //     currentTopicSubs
    //   );

    const resetStatus = async () => {
        const userLTVPair = ["@user_ltv", (0).toString()];
        const userTierPair = ["@user_tier", "Bronze"];
        // const userAlertPair = ["@alert_preferences", "daily"];
        const userPrefPair = ["@push_subscribed", (false).toString()];
        const userIdPair = ["@user_id", ""];
        const userEmailPair = ["@user_email", ""];
        const userAppInstallDate = ["@app_install_date", ""];
        // const userFollowingTopics = ["@following_topics", ""];

        pleaseReset = true;

        setMembershipTier("Bronze");
        lifetimeValueTicker(0);
        pushToggle(true);
        // alertToggle("daily");
        setId("EXAMPLEID");
        setEmail("email@example.com");
        setAppInstallDate("UNKNOWN");
        // setFollowingTopics("");

        try {
          await AsyncStorage.multiSet([userLTVPair, userTierPair, userPrefPair, userEmailPair, userIdPair, userAppInstallDate, userAppInstallDate]);

        } catch (e) {
          alert(`Something went wrong with resetStatus(): ${e}`);
        }
      };

      const getUserData = async () => {

        let values
        try {
            values = await AsyncStorage.multiGet(["@alert_preferences", "@push_subscribed", "@user_id", "@user_email", "@app_install_date", "@following_topics"]);
        } catch(e) {
            alert(`Something went wrong with getUserData(): ${e}`);
        }
      
        const userAlertValue = values[0][1];
        const userPushValue = values[1][1];
        const userIdValue = values[2][1];
        const userEmailValue = values[3][1];
        const appInstallDateValue = values[4][1];
        const followingTopicsValue = values[5][1];

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

        if (followingTopicsValue) {
            followingTopics = followingTopicsValue;
            // const followingTopicsArray = followingTopicsValue.split(",");
            // followingTopicsArray.forEach(topic => {
            //     topics.push(topic);
            // });
        }
        else {
            followingTopics = "";
        }

        const capitalizedPrefs = currentAlertPrefs.charAt(0).toUpperCase() + currentAlertPrefs.slice(1);

        pushToggle(currentPushPref);
        alertToggle(capitalizedPrefs);
        setId(userId);
        setEmail(userEmail);
        setAppInstallDate(appInstallDate);
        setFollowingTopics(followingTopics);
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
            userLTV = parseInt(userLtvValue);
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
    const [currentAppInstallDate, setAppInstallDate] = useState(appInstallDate);
    const [currentFollowingTopics, setFollowingTopics] = useState(followingTopics);

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
            <Text style={styles.label}>Total Following Topics: </Text> 
        {currentPushValue ? subs.length : "N/A"}</Text>
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

        <TouchableOpacity onPress={() => resetStatus()}>
            <Text style={styles.resetButton}>Reset Your Status</Text>
        </TouchableOpacity>

    </View>
    );
};

export { AboutScreen, pleaseReset };