import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Map from '../components/Map';
import MapStyles from '../styles/MapStyles';

export default class MapScreen extends React.Component {
  render() {
    return (
      <View>
        <Map/>
      </View>
    );
  }
}