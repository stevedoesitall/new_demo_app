import React, { useReducer } from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

const MessageScreen = () => {

  const currentMessageStream = [];

  const getMessageStream = () => {

    Carnival.getMessages().then(messages => {
      messages.forEach(message => {
        currentMessageStream.push(message);
      });
    }).catch(error => {
      console.log(error);
    });
  };

  getMessageStream();

  const messageStreamReducer = (state, action) => {
    switch (action) {
      case "mark_read":
        return state;
      case "delete":
          Carnival.removeMessage(message).then(result => {
            return state.map(message => {
              return {...message}
            });
          }).catch(error => {
            console.log(error);
          });
      default:
        return state;
    }
  };

  const [messages, dispatch] = useReducer(
    messageStreamReducer, 
    currentMessageStream
  );

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
    <FlatList
      keyExtractor={(item => {
          return item.id
      })}
      data={messages}
      renderItem={( {item} ) => {
          return (
          <View style={styles.view}>
              <View style={styles.messagesVisible}>
                  <Text style={styles.messageTitle}>{item.title}</Text>
                  <Text style={styles.messageText}>{item.text}</Text>
                  {item.card_image_url ?
                  <Image
                  style={styles.messageImage}
                  source={{uri: item.card_image_url}}
                  resizeMode="contain"
                  /> : null
                  }
              <View style={styles.buttonRow}>
                  <TouchableOpacity
                  onPress={() => dispatch({action: "delete", message: item})}
                  >
                  <Text style={styles.messageActions}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => dispatch({action: "delete", message: item})}
                  >
                  <Text style={styles.messageActions}>Mark Read</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => dispatch({action: "delete", message: item})}
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
};

export default MessageScreen;