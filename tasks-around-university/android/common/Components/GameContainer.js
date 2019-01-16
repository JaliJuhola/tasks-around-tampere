import React from 'react';
import { StyleSheet, View, ScrollView, Image} from 'react-native';

export class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        const tuniColor = '#4e008e';
      return (
        <View style={{borderWidth: 1,borderColor: 'black',backgroundColor: tuniColor,justifyContent: 'space-evenly'}}>
              {this.props.children}
        </View>
      );
    }
}
