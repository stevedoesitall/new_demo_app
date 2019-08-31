import React, { Component } from "react";
import { View, Text, Image, Button, Picker } from "react-native";
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
                <Button
                    style={styles.button}
                    title="Update Cart"
                    onPress={() => this.props.updateFunc(this.state.qty)}
                    />
                </View>
                <Picker
                    style={styles.pickerStylesVisible}
                    selectedValue={this.state.qty}
                    onValueChange={(value) => this.updatePickerVal(value)}
                >
                <Picker.Item label="0" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                </Picker>                
            </View>
        );
    }
}

export default PurchaseDetails;