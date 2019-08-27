import React, { useState } from "react";
import { Text, View, Button, FlatList, Image } from "react-native";
import styles from "../components/StyleSheet.js";
import { itemDetailsArray } from "../components/ItemFile.js";

let currentCart = [];

const PurchaseScreen = () => {

const [currentCartLength, cartLengthTicker] = useState(0);
const [currentCartValue, cartValueTicker] = useState(0);
let newCartValue = 0;

  const addToCart = (item) => {
    if (currentCart.length > 0) {
      const currentItems = [];
      currentCart.forEach(cartItem => {
        currentItems.push(cartItem.title);
      });
      if (!currentItems.includes(item.title)) {
        currentCart.push(item);
        cartLengthTicker(currentCart.length);
        newCartValue = newCartValue + item.vars.basePrice * item.qty;
        cartValueTicker(newCartValue);
      }
      else {
        alert("This item is already in your cart!");
      }
    }
    else {
      currentCart.push(item);
      cartLengthTicker(currentCart.length);
      newCartValue = newCartValue + (item.vars.basePrice * item.qty);
      cartValueTicker(newCartValue);
    }
    const logType = "logAbandonedCart";
    alert(`${currentCart.length} item${currentCart.length > 1 ? "s are" : " is"} in your cart, ${logType}`);
  };

  const removeFromCart = (item) => {
    if (currentCart.includes(item)) {
      for (let pos = 0; pos < currentCart.length; pos++) {
        const newCart = [];
        currentCart.forEach(cartItem => {
          if (cartItem != item) {
            newCart.push(item);
          }
          else {
            newCartValue = newCartValue - (item.vars.basePrice * item.qty);
            cartValueTicker(newCartValue);
          }
        });
        currentCart = newCart;
        cartLengthTicker(currentCart.length);
        if (currentCart != 0) {
          const logType = "logAbandonedCart";
          alert(`${currentCart.length} items added to cart, ${logType}`);
        }
      }
    }
    else {
      alert("This item isn't in your cart!");
    }
    cartLengthTicker(currentCart.length);
  };

  const purchase = () => {
    const logType = "logPurchase";
    alert(`${currentCart.length} items purchased, ${logType}`);
  };

  return (
    <View style={styles.view}>
    <Text style={styles.header}>Make a Purchase:</Text>
    <Text style={styles.subhead}>Number of Items in Cart: {currentCartLength}</Text>
    <Text style={styles.subhead}>Total Value of Cart: ${currentCartValue/100}</Text>
    <Button
      title="Complete Your Purchase"
      onPress={() => {
        if (currentCart.length == 0) {
          alert("Nothing in your cart!")
        }
        else {
          purchase();
        }
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