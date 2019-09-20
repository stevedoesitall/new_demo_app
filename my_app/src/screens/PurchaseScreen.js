import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import PurchaseDetails from "../components/PurchaseComp.js";
import { itemDetailsArray } from "../components/ItemFile.js";
import tierMap from "../components/TierMap.js";
import AsyncStorage from "@react-native-community/async-storage";
import Carnival from "react-native-carnival";

let userTier;
let userCart = [];

const PurchaseScreen = () => {
    
    const getCart = async () => {
        try {
          const value = await AsyncStorage.getItem("@current_cart");
          if (value) {
            userCart = JSON.parse(value).userCartObject;
    
            let totalPurchaseValue = 0;
            userCart.forEach(cartItem => {
              totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.price);
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
            userLTV = parseInt(value);
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
          await AsyncStorage.setItem("@user_ltv", (userLTV).toString());
          lifetimeValueTicker(userLTV);
          storeTier(userLTV);
        } catch (e) {
          alert(`Something went wrong with storeLTV(): ${e}`);
        }
      };
    
      const storeTier = async (currentLTV) => {
    
        const currentLTVDivided = currentLTV / 100;

        let currentTierLevel;
        let newUserTier;
        let newTierLevel;

        for (let pos = 0; pos < tierMap.length; pos++) {
          if (tierMap[pos].status == userTier) {
            currentTierLevel = tierMap[pos].level;
            break;
          }
        }

        for (let pos = 0; pos < tierMap.length; pos++) {
          if (currentLTVDivided >= tierMap[pos].points) {
            newUserTier = tierMap[pos].status;
            newTierLevel = tierMap[pos].level;
            break;
          }
        }

        try {
          await AsyncStorage.setItem("@user_tier", newUserTier);
          if (newTierLevel > currentTierLevel) {
            alert(`Congratulations! You are now a ${newUserTier} member.`);
            //Add custom event trigger here
          }
        } catch (e) {
          alert(`Something went wrong with storeCart(): ${e}`);
        }

        const attrMap = new Carnival.AttributeMap();
        attrMap.setString("user_tier", newUserTier);
        attrMap.setInteger("total_points", currentLTV);
        Carnival.setAttributes(attrMap).catch(error => {
          console.log(`Error setting device attributes: ${error}`);
        });
      };
    
      const [currentCartLength, cartLengthTicker] = useState(0);
      const [currentCartValue, cartValueTicker] = useState(0);
      const [lifetimeValue, lifetimeValueTicker] = useState(0);

      const updateCart = (qty, item) => {
          if (qty == 0) {
              const type = "update";
              removeFromCart(item, type);
          }
          else {
            item.qty = qty;
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
                    userCart.forEach(cartItem => {
                        if (cartItem.title == item.title) {
                            if (cartItem.qty == item.qty) {
                              alert("No changes made to cart.");
                            }
                            else {
                              cartItem.qty = item.qty;
                              alert(`There are now ${item.qty} of ${item.title} in your cart.`);
                            }
                        }
                    });
                  }
                }
            else {
                userCart.push(item);
                alert(`${item.title} added to your cart.`);
            }
        let totalPurchaseValue = 0;
        userCart.forEach(cartItem => {
            totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.price);
        });
        cartValueTicker(totalPurchaseValue);
        cartLengthTicker(userCart.length);
        storeCart();
        }

        const abandonedItems = [];

        userCart.forEach(cartItem => {
          const abandonedItem = new Carnival.PurchaseItem(cartItem.qty, cartItem.title, cartItem.price, cartItem.sku, cartItem.url);

          abandonedItem.setTags(cartItem.tags);
          abandonedItem.setImages(cartItem.images);
          abandonedItem.setVars(cartItem.vars);

          abandonedItems.push(abandonedItem);
        });

        const abandoned = new Carnival.Purchase(abandonedItems);
        Carnival.logAbandonedCart(abandoned).then(result => {
          // alert(`Success: ${result}`);
        }).catch(error => {
          // alert(`Error: ${error}`);
        });

      };
    
      const removeFromCart = (item, type) => {
        if (userCart.length > 0) {
          const cartContents = [];
          userCart.forEach(cartItem => {
            cartContents.push(cartItem.title);
          });
          if (cartContents.includes(item.title)) {
            userCart = userCart.filter(cartItem => cartItem.title != item.title);
            if (type == "update") {
              alert(`${item.title} removed from your cart.`);
            }
            else if (type == "clear_cart") {
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
          totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.price);
        });
        cartValueTicker(totalPurchaseValue);
        cartLengthTicker(userCart.length);
        storeCart();
      }; 
    
      const submitPurchase = () => {
        if (userCart.length == 0) {
          alert("You can't checkout with an empty cart.");
          return false;
        }
        else {
          const type = "purchase";

          let totalItems = 0;
          let totalPurchaseValue = 0;

          const purchaseItems = [];

          userCart.forEach(cartItem => {
            totalItems = totalItems + cartItem.qty;
            totalPurchaseValue = totalPurchaseValue + (cartItem.qty * cartItem.price);

            const purchaseItem = new Carnival.PurchaseItem(cartItem.qty, cartItem.title, cartItem.price, cartItem.sku, cartItem.url);

            purchaseItem.setTags(cartItem.tags);
            purchaseItem.setImages(cartItem.images);
            purchaseItem.setVars(cartItem.vars);

            purchaseItems.push(purchaseItem);
            
          });

          alert(`You purchased ${totalItems} total item${totalItems > 1 ? "s" : ""} for $${totalPurchaseValue/100}.`);
          clearCart(type);
          storeLTV(totalPurchaseValue);
          cartLengthTicker(userCart.length);
          storeCart();

          const attrMap = new Carnival.AttributeMap();
          attrMap.setDate("last_app_purchase_date", new Date());
          Carnival.setAttributes(attrMap).catch(error => {
            console.log(`Error setting device attributes: ${error}`);
          });

          const purchase = new Carnival.Purchase(purchaseItems);

          purchase.setVars({st_cost: totalPurchaseValue});


          Carnival.logPurchase(purchase).then(result => {
            // alert(`Success: ${result}`);
          }).catch(error => {
            // alert(`Error: ${error}`);
          });

          const eventName = "AppPurchase";
          const eventVars = {};
          Carnival.logEvent(eventName, eventVars);
          
        }
      };
    
      const clearCart = (clearType) => {
        let type;
        if (!clearType) {
          type = "clear_cart";
        }
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
          <Text style={styles.label}>Unique Products in Cart: </Text> 
            {currentCartLength}</Text>
        <Text style={styles.subhead}>
          <Text style={styles.label}>Total Value of Cart: </Text> 
            ${(currentCartValue/100).toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => {
            submitPurchase();
          }}
        >
        <Text style={styles.customButton}>Complete Your Purchase</Text>
      </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            clearCart();
          }}
        >
        <Text style={styles.customButton}>Empty Your Cart</Text>
        </TouchableOpacity>
        <FlatList
            keyExtractor={(item => {
                return item.sku
            })}
            data={itemDetailsArray}
            renderItem={( {item} ) => {
                return (
                  <View style={styles.view}>
                      <PurchaseDetails
                          title={item.title}
                          image={item.images.thumb.url}
                          price={item.price}
                          updateFunc={(qty) => updateCart(qty, item)}
                      />
                  </View>
                )
            }}
        />
        </View>
    )
}

export default PurchaseScreen;