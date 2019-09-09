import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

const MessageScreen = () => {

  const [currentMessageStream, setMessageStream] = useState("");

  const getMessageStream = () => {

      Carnival.getMessages().then(messages => {
        setMessageStream(messages);
      }).catch(error => {
          console.log(error);
      });
  };

  getMessageStream();

  const updateMessageScreen = (action, message) => {
    if (action == "delete") {
        Carnival.removeMessage(message).then(result => {
          Carnival.getMessages().then(messages => {
            setMessageStream(messages);
          }).catch(error => {
              console.log(error);
          });
        }).catch(error => {
            console.log(error);
        });
    }
    else if (action == "mark_read") {
        Carnival.markMessageAsRead(message).then(result => {
          Carnival.getMessages().then(messages => {
            setMessageStream(messages);
          }).catch(error => {
              console.log(error);
          });
          }).catch(error => {
            alert(error);
        });
    }
    else if (action == "full_screen") {
        Carnival.presentMessageDetail(message);
    };
};

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
    <FlatList
      keyExtractor={(item => {
          return item.id
      })}
      data={currentMessageStream}
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
                  onPress={() => updateMessageScreen("delete", item)}
                  >
                  <Text style={styles.messageActions}>Delete</Text>
                  </TouchableOpacity>
                  {!item.is_read ? 
                      <TouchableOpacity
                      onPress={() => updateMessageScreen("mark_read", item)}
                      >
                      <Text style={styles.messageActions}>Mark Read</Text>
                      </TouchableOpacity>
                  : null
                  }
                  <TouchableOpacity
                      onPress={() => updateMessageScreen("full_screen", item)}
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