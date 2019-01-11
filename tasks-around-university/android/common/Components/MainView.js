import React from 'react';
import { Appbar} from 'react-native-paper';
import { StyleSheet, View, ScrollView, Image} from 'react-native';

export class MainView extends React.Component {
    render() {
      return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', zIndex: 0, top: 0, left: 0, bottom: 0, right: 0}}>
        <Image source={require("../../assets/images/tay.jpg")} blurRadius={1} style={{position: "absolute", width: '100%', height: '100%', justifyContent: 'center', zIndex: 0, top: 0, left: 0, bottom: 0, right: 0}}/>
        <View>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={this.props.onExit}
              >
              </Appbar.BackAction>
              <Appbar.Content
                title={this.props.mainTitle}
              />
          </Appbar.Header>
        </View>
          <View style={{flex:1}}>
              {this.props.children}
          </View>
        </View>
      );
    }
}
