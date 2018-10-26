import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Scanner from '../components/Scanner'
export default class ScannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Scanner',
  };

  render() {
    return (
        <Scanner>
        </Scanner>
    );
  }
}
