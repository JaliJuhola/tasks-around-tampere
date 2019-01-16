import React from 'react';
import { Appbar} from 'react-native-paper';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
<<<<<<< HEAD

export class MainView extends React.Component {
    render() {
=======
import { Loading } from './Loading';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    var loadingTitle = "Ladataan";
    if(this.props.loadingTitle){
      loadingTitle = this.props.loadingTitle;
    }
    this.state = {
      isLoading: this.props.isLoading,
      loadingTitle: loadingTitle,
    };
  }
    render() {
      if(this.props.isLoading) {
        return (
          <View style={{width: '100%', height: '100%', justifyContent: 'center', zIndex: 0, top: 0, left: 0, bottom: 0, right: 0}}>
          <Image source={require("../../assets/images/tay.jpg")} blurRadius={1} style={{position: "absolute", width: '100%', height: '100%', justifyContent: 'center', zIndex: 0, top: 0, left: 0, bottom: 0, right: 0}}/>
          <View>
            <Appbar.Header>
              <Appbar.BackAction
                onPress={() => {this.props.isLoading=false;}}
                >
                </Appbar.BackAction>
                <Appbar.Content
                  title={this.props.mainTitle}
                />
            </Appbar.Header>
          </View>
            <View style={{flex:1}}>
                <Loading message={this.state.loadingTitle}></Loading>
            </View>
          </View>
        )
      }
>>>>>>> development
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
<<<<<<< HEAD
          <View style={{flex:1}}>
=======
          <View style={{flex:1, justifyContent:"space-around"}}>
>>>>>>> development
              {this.props.children}
          </View>
        </View>
      );
    }
}
