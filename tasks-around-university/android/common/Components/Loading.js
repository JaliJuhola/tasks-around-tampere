import React from 'react';
import { StyleSheet, View} from 'react-native';
import {Headline } from 'react-native-paper';
import {Bubbles} from 'react-native-loader';

export class Loading extends React.Component {
    render() {
      return (
        <View style={styles.loading}><Headline style={styles.headline}>{this.props.message}</Headline><Bubbles size={10} color="purple" /></View>
      );
    }
}
const styles = StyleSheet.create({
    headline: {
      paddingBottom: 30,
      textAlign: 'center',
      fontSize: 24,
    },

    loading:{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
