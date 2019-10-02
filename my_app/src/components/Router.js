import React, { Component } from "react";
import { Linking } from "react-native";

class LinkingComp extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
  _handleOpenURL(event) {
    alert(event);
    console.log(event.url);
  }
};

export default LinkingComp;