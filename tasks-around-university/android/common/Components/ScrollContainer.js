import React from 'react';
import {View, ScrollView} from 'react-native';

export class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        const tuniColor = '#4e008e';
      return (
        <ScrollView contentContainerStyle={{borderWidth: 1,borderColor: 'black',backgroundColor: tuniColor,justifyContent: 'space-evenly'} }>
              {this.props.children}
        </ScrollView>
      );
    }
}
