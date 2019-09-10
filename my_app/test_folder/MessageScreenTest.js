import React, { useState } from "react";
import { ActivityIndicator, Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "../components/StyleSheet.js";
import Carnival from "react-native-carnival";

const MessageScreen = () => {

  const [currentMessageStream, setMessageStream] = useState("");
//   const [unreadCount, setUnreadCount] = useState(0);
  const [animatingState, setAnimatingState] = useState(true);

  const getMessageStream = () => {

      Carnival.getMessages().then(messages => {
        setMessageStream(messages);
        setAnimatingState(false);
      }).catch(error => {
          console.log(error);
      });
  };

//   const getUnreadCount = () => {
//     Carnival.getUnreadCount().then(function(count) {
//       setUnreadCount(count);
//     }, function(e){
//       // Handle error
//     });
//   };

  getMessageStream();
//   getUnreadCount();

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
        Carnival.presentMessageDetail(message);
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
};

  return (
  <View style={styles.view}>
    <Text style={styles.header}>Your Message Center</Text>
        {currentMessageStream.length == 0  && animatingState == false ? 
            <Text style={styles.subhead}>No messages!</Text>
        : null}

        {animatingState == true ? 
            <Text style={styles.subhead}>Retrieving messages, please wait...</Text>
        : null}

        {animatingState == true ? 
            <ActivityIndicator
                animating={animatingState}
                size="large"
                style={styles.activityIndicator}
            />
        : null}
    {/* <View style={styles.buttonRow}>
      <TouchableOpacity
      >
        <Text style={styles.textButton}>Mark As Read</Text>
      </TouchableOpacity>
      <Text style={styles.textButton}> | </Text>
      <TouchableOpacity
      >
        <Text style={styles.textButton}>Delete</Text>
      </TouchableOpacity>
    </View> */}
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
                  <TouchableOpacity
                      onPress={() => updateMessageScreen("mark_read", item)}
                      >
                  <Text style={styles.messageActions}>Read</Text>
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