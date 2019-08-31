import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, PickerIOS } from "react-native";
import styles from "../components/StyleSheet.js";


//Next task: Create a callback that saves/updates the default 0 qty state
class PurchaseDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { qty : 0 }
    }
    updatePickerVal = (value) => {
        this.setState({qty : value})
    };
    render() {
        return (
            <View>
                <Text style={styles.recTitle}>
                    {this.props.title} for ${this.props.price/100}
                </Text>
                <Image
                    style={styles.recImage}
                    source={{uri: this.props.image}}
                    resizeMode="contain"
                />
                <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => this.props.updateFunc(this.state.qty)}>
                    <Text style={styles.belowAverageButton}>Update Cart</Text>
                </TouchableOpacity>
                </View>
                <PickerIOS
                    itemStyle={styles.pickerStylesVisible}
                    selectedValue={this.state.qty}
                    onValueChange={(value) => this.updatePickerVal(value)}
                >
                    <PickerIOS.Item label="0" value={0} />
                    <PickerIOS.Item label="1" value={1} />
                    <PickerIOS.Item label="2" value={2} />
                    <PickerIOS.Item label="3" value={3} />
                    <PickerIOS.Item label="4" value={4} />
                    <PickerIOS.Item label="5" value={5} />
                    <PickerIOS.Item label="6" value={6} />
                    <PickerIOS.Item label="7" value={7} />
                    <PickerIOS.Item label="8" value={8} />
                    <PickerIOS.Item label="9" value={9} />
                </PickerIOS>                
            </View>
        );
    }
}

export default PurchaseDetails;