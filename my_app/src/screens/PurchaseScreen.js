import React, { useState } from "react";
import { Text, View, Button, FlatList, Image } from "react-native";
import styles from "../components/StyleSheet.js";
import { itemDetailsArray } from "../components/ItemFile.js";
import AsyncStorage from "@react-native-community/async-storage";

let userCart = [];
let userTier;

const PurchaseScreen = () => {

  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem("@current_cart");
      if (value) {
        userCart = JSON.parse(value).userCartObject;

        let totalPurchaseValue = 0;
        userCart.forEach(cartItem => {
          totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.vars.basePrice);
        });
        cartValueTicker(totalPurchaseValue);
        cartLengthTicker(userCart.length);
      }
    } catch(e) {
      alert(`Something went wrong with getCart(): ${e}`);
    }
  };

  const getLTV = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_ltv");
      if (value) {
        userLTV = value;
      }
      else {
        userLTV = 0;
      }
      lifetimeValueTicker(userLTV);
    } catch(e) {
      alert(`Something went wrong with getLTV(): ${e}`);
    }
  };

  const getTier = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_tier");
      if (value) {
        userTier = value;
      }
      else {
        userTier = "Bronze";
      }
    } catch(e) {
      alert(`Something went wrong with getLTV(): ${e}`);
    }
  };
  
  getCart();
  getLTV();
  getTier();

  const storeCart = async () => {
    const userCartString = { userCartObject: userCart };
    try {
      await AsyncStorage.setItem("@current_cart", JSON.stringify(userCartString));
    } catch (e) {
      alert(`Something went wrong with storeCart(): ${e}`);
    }
  };


  const storeLTV = async (totalPurchaseValue) => {
    const userLTV = totalPurchaseValue + parseInt(lifetimeValue);
    try {
      await AsyncStorage.setItem("@user_ltv", userLTV);
      lifetimeValueTicker(userLTV);
      storeTier(userLTV);
    } catch (e) {
      alert(`Something went wrong with storeLTV(): ${e}`);
    }
  };


  //Add function to check if user moved into a new tier
  const storeTier = async (currentLTV) => {

    const tierMap = {
      "Diamond": 5,
      "Platinum": 4,
      "Gold": 3,
      "Silver": 2,
      "Bronze": 1
    };

    const currentLTVDivided = currentLTV / 100;

    let newUserTier;
    if (currentLTVDivided >= 5000) {
      newUserTier = "Diamond";
    }
    else if (currentLTVDivided >= 1000) {
      newUserTier = "Platinum";
    }
    else if (currentLTVDivided >= 500) {
      newUserTier = "Gold";
    }
    else if (currentLTVDivided >= 100) {
      newUserTier = "Silver";
    }
    else {
      newUserTier = "Bronze";
    };
    try {
      await AsyncStorage.setItem("@user_tier", newUserTier);
      const currentTierNum = tierMap[userTier];
      const newTierNum = tierMap[newUserTier];
      if (newTierNum > currentTierNum) {
        alert(`Congratulations! You are now a ${newUserTier} member.`);
        //Add custom event trigger here
      }
    } catch (e) {
      alert(`Something went wrong with storeCart(): ${e}`);
    }
  };

  const [currentCartLength, cartLengthTicker] = useState(0);
  const [currentCartValue, cartValueTicker] = useState(0);
  const [lifetimeValue, lifetimeValueTicker] = useState(0);

  const addToCart = (item) => {
    if (userCart.length > 0) {
      const cartContents = [];
      userCart.forEach(cartItem => {
        cartContents.push(cartItem.title);
      });
      if (!cartContents.includes(item.title)) {
        userCart.push(item);
        alert(`${item.title} added to your cart.`);
      }
      else {
        alert(`${item.title} is already in your cart!`);
      }
    }
    else {
      userCart.push(item);
      alert(`${item.title} added to your cart.`);
    }
    let totalPurchaseValue = 0;
    userCart.forEach(cartItem => {
      totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.vars.basePrice);
    });
    cartValueTicker(totalPurchaseValue);
    cartLengthTicker(userCart.length);
    storeCart();
  };

  const removeFromCart = (item, type) => {
    if (userCart.length > 0) {
      const cartContents = [];
      userCart.forEach(cartItem => {
        cartContents.push(cartItem.title);
      });
      if (cartContents.includes(item.title)) {
        userCart = userCart.filter(cartItem => cartItem.title != item.title);
        if (type != "clear_cart") {
          alert(`${item.title} removed from your cart.`);
        }
        else {
          alert("Your cart has been emptied.");
        }
      }
      else {
        alert(`${item.title} isn't in your cart.`);
      }
    }
    else {
      alert("You can't remove items from an empty cart.");
    }
    let totalPurchaseValue = 0;
    userCart.forEach(cartItem => {
      totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.vars.basePrice);
    });
    cartValueTicker(totalPurchaseValue);
    cartLengthTicker(userCart.length);
    storeCart();
  }; 

  const purchase = () => {
    if (userCart.length == 0) {
      alert("You can't checkout with an empty cart.");
      return false;
    }
    else {
      let totalItems = userCart.length;
      let totalPurchaseValue = 0;
      userCart.forEach(cartItem => {
        totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.vars.basePrice);
      });
      alert(`You purchased ${totalItems} total item${totalItems > 1 ? "s" : ""} for $${totalPurchaseValue/100}.`);
      clearCart();
      storeLTV(totalPurchaseValue);
      cartLengthTicker(userCart.length);
      storeCart();
    }
  };

  const clearCart = () => {
    const type = "clear_cart";
    if (userCart.length > 0) {
      userCart.forEach(item => {
        removeFromCart(item, type);
      });
    }
    else {
      alert("There's nothing in your cart!");
    }
  };

  return (
    <View style={styles.view}>
    <Text style={styles.header}>Make a Purchase</Text>
    <Text style={styles.subhead}>
      <Text style={styles.label}>Number of Items in Cart: </Text> 
        {currentCartLength}</Text>
    <Text style={styles.subhead}>
      <Text style={styles.label}>Total Value of Cart: </Text> 
        ${currentCartValue/100}</Text>
    <Button
      title="Complete Your Purchase"
      onPress={() => {
        purchase();
      }}
    />
    <Button
      title="Empty Your Cart"
      onPress={() => {
        clearCart();
      }}
    />
    <FlatList
    keyExtractor={(testItem) => {
      return testItem.sku;
    }}
    data={itemDetailsArray}
    renderItem={( {item} ) => {
      return (
        <View style={styles.view}>
          <Text style={styles.recTitle}>{item.title} for ${item.vars.basePrice/100}</Text>
          <Image
              style={styles.recImage}
              source={{uri: item.image}}
              resizeMode="contain"
          />
          <View style={styles.buttonRow}>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item)}
            />
            <Button
              title="Remove from Cart"
              onPress={() => removeFromCart(item)}
            />
          </View>
        </View>
      );
      }}
    />
  </View>
  );
};

export default PurchaseScreen;