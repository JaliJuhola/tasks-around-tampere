import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Scanner from '../components/Scanner';
import { Actions } from 'react-native-router-flux';

export default class ScannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Scanner',
  };
  render() {
    navigate_to_minigame = (control) => {
        if(control === "push_the_buttons") {
          Actions.push_the_buttons()
          return true;
        }
    }
    return (
        <Scanner scan_action={navigate_to_minigame}>
        </Scanner>
    );
  }
}
