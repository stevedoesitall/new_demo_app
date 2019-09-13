import React, { Component } from "react";
import { Linking } from "react-native";

class LinkingComp extends Component {
    componentDidMount() {
      Linking.getInitialURL().then((url) => {
        if (url) {
          alert(url);
        }
      }).catch(error => alert('An error occurred', error));
    }
  };

export default LinkingComp;