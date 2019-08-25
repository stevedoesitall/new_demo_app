import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "../components/StyleSheet.js";
import PurchaseDetails from "../components/PurchaseDetails";

const itemDetails = {
  title: "Black Chelsea Boots",
  sku: "SKUBOOTS1",
  image: require("../../assets/Boots.png"),
  tags: ["mens", "color-black", "material-leather", "category-footwear", "subtype-boots", "price-101-200"],
  url: "http://example.com/black_chelsea_boots",
  vars: {
    gender: "mens",
    basePrice: 19999
  }
};

const PurchaseScreen = () => {
  const [qty, setQty] = useState(1);
    
  return (
  <View>
      <PurchaseDetails 
        title={itemDetails.title}
        image={itemDetails.image}
        price={(itemDetails.vars.basePrice * qty).toFixed(2)}
      />
      <View style={styles.buttonRow}>
        <Text style={styles.label}>Qty: {qty}</Text>
        <Button 
          style={styles.qtyBtn}
          title="+"
          onPress={() => {
            if (qty == 10) {
              alert("You can only buy 10!");
              return false;
            }
            else {
              setQty(qty + 1);
            }
          }}
        />
        <Button 
          style={styles.qtyBtn}
          title="-"
          onPress={() => {
            if (qty == 1) {
              alert("You need to buy at least 1!");
              return false;
            }
            else {
              setQty(qty - 1);
            }
          }}
        />
      </View>
      <Button
        title="Add to Cart"
        onPress={() => addToCart(qty)}
      />
      <Text style={styles.subhead}>-OR-</Text>
      <Button
        title="One-Click Purchase"
        onPress={() => purchase(qty)}
      />
  </View>
  );
};

purchaseDetails = (qty) => {
  itemDetails.price = itemDetails.vars.basePrice * qty;
};

addToCart = (qty) => {
  purchaseDetails(qty);
  const logType = "logAbandonedCart";
  alert(`${itemDetails.price}, ${logType}`);
};

purchase = (qty) => {
  purchaseDetails(qty);
  const logType = "logPurchase";
  alert(`${itemDetails.price}, ${logType}`);
};

export default PurchaseScreen;