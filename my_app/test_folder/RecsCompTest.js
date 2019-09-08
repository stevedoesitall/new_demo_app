import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

class RecsDetails extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            sectionId : "fc2b679a-d0bf-11e9-a006-002590d1a41a",
            vertical: "Commerce",
            algorithm: "Interest"
        }
    }
    
    updateRecs = (sectionId, vertical, algorithm) => {
        this.setState({
            sectionId : sectionId,
            vertical: vertical,
            algorithm: algorithm
        })

        Carnival.getRecommendations(this.state.sectionId).then(function(recs) {
            this.setState({
                recs: recs
            });
        }, function(err) {
            alert(err);
        });
    };
    
    render() {
        return (
        <View>
            <FlatList
                keyExtractor={(item) => {
                return item.title;
                }}
                data={this.state.recs}
                renderItem={( {item} ) => {
                return (
                <View>
                    <Text style={styles.recTitleTwo}>{item.title}</Text>
                    <Image
                        style={styles.recImage}
                        source={{uri: item.image}}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonRow}>
                      <TouchableOpacity>
                          <Text style={styles.belowAverageButton}>{this.state.vertical == "Media" ? "View Article" : "View Item"}</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                );
                }}
            />
        </View>
        );
    }
};

export default RecsDetails;