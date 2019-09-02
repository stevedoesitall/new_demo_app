import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./StyleSheet.js";

const PrefDetails = ( {} ) => {
    return (
        <View>
            {getState(this.props.subStatus)}
            <TouchableOpacity onPress={() => this.updateFunc(this.state.subbed)}>
                <Text style={this.state.subbed ? styles.subButton : styles.unsubButton}>{this.props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PrefDetails;