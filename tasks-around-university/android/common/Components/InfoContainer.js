import React from 'react';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class InfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        const tuniColor = '#d9edf7';
      return (
        <View style={{borderWidth: 1,borderColor: '#bce8f1',backgroundColor: tuniColor,justifyContent: 'space-around'}}>
        <Icon name="info" size={40} color={'#31708f'}/>
              {this.props.children}
        </View>
      );
    }
}
