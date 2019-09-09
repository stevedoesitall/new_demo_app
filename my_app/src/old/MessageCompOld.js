import React, { Component } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

let messageStream = [];

const getMessageStream = () => {

    Carnival.getMessages().then(messages => {
    messages.forEach(message => {
        messageStream.push(message);
        });
    }).catch(error => {
        console.log(error);
    });
};

    getMessageStream();

class MessageDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { currentStream : messageStream }
    }
    updateMessageScreen = (action, message) => {
        if (action == "delete") {
            Carnival.removeMessage(message).then(result => {
                messageStream = messageStream.filter(currentMessage => currentMessage.id != message.id);

                console.log(result);
            this.setState({currentStream : messageStream})
            }).catch(error => {
                console.log(error);
            });
        }
        else if (action == "mark_read") {
            Carnival.markMessageAsRead(message).then(result => {
                let newStream = [];
                Carnival.getMessages().then(messages => {
                    messages.forEach(message => {
                        newStream.push(message);
                        });
                    this.setState({currentStream : newStream})
                    }).catch(error => {
                        console.log(error);
                    });
                console.log(result);
                getMessageSteam();
              }).catch(error => {
                alert(error);
            });
        }
        else if (action == "full_screen") {
            Carnival.presentMessageDetail(message);
        };
    };
    render() {
        return (
            <View>
            <FlatList
                    keyExtractor={(item => {
                        return item.id
                    })}
                    data={this.state.currentStream}
                    extraData={this.state}
                    renderItem={( {item} ) => {
                        return (
                        <View style={styles.view}>
                            <View style={item.is_read ? styles.messagesRead : styles.messagesUnread}>
                                <Text style={item.is_read ? styles.messageTitleRead : styles.messageTitleUnread}>{item.title}</Text>
                                <Text style={item.is_read ? styles.messageTextRead : styles.messageTextUnread}>{item.text}</Text>
                                {/* {item.card_image_url ?
                                <Image
                                style={styles.messageImage}
                                source={{uri: item.card_image_url}}
                                resizeMode="contain"
                                /> : null
                                } */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                onPress={() => this.updateMessageScreen("delete", item)}
                                >
                                <Text style={styles.messageActions}>Delete</Text>
                                </TouchableOpacity>
                                {!item.is_read ? 
                                    <TouchableOpacity
                                    onPress={() => this.updateMessageScreen("mark_read", item)}
                                    >
                                    <Text style={styles.messageActions}>Mark Read</Text>
                                    </TouchableOpacity>
                                : null
                                }
                                <TouchableOpacity
                                    onPress={() => this.updateMessageScreen("full_screen", item)}
                                    >
                                <Text style={styles.messageActions}>Full Screen</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                        )
                    }}
                />          
            </View>
        );
    }
};

export default MessageDetails;