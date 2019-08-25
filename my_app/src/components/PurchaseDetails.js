import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../components/StyleSheet.js";

const PurchaseDetails = (props) => {

    const title = props.title;
    const image = props.image;
    const price = props.price;

    return (
        <View style={styles.view}>
            <Text style={styles.header}>{title}</Text>
            <Image
                style={styles.image}
                source={image}/>
            <Text style={styles.subhead}>${price / 100}</Text>
        </View>
    );
};

export default PurchaseDetails;