import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

/*Stylesheets*/
import StartScreenStyles from '../styles/StartScreenStyles';



export default class StartScreen extends React.Component {
  state = {
    username: '',
    groupname: '',
  };

  /*
  static navigationOptions = {
    header: null,
  };
  */
  
  joinGroup(){
    console.log('Liity Ryhmään: ' + this.state.groupname);
  }

  render() {
    return (
      <View style={StartScreenStyles.container}>
        <Image
          source={require('../../assets/images/tay.jpg')}
          style={StartScreenStyles.backgroundImage}
          blurRadius={1}
        />
        <View style={StartScreenStyles.logo}>
          <Text style={StartScreenStyles.logoText}>
            T3-Game
          </Text>
        </View>
        <Text style={StartScreenStyles.smallText}>
          Aseta käyttäjänimi ja ryhmän nimi
        </Text>
        <View style={StartScreenStyles.inputContainer}>
          <View style={StartScreenStyles.iconWrap}><Icon name="user" size={24} style={StartScreenStyles.inputIcon} /></View>
          <TextInput
            label='Käyttäjänimi'
            value={this.state.username}
            onChangeText={text => this.setState({username:text})}
            style={StartScreenStyles.textInput}
          />
        </View>
        <View style={StartScreenStyles.inputContainer}>
          <View style={StartScreenStyles.iconWrap}><Icon name="group" size={24} style={StartScreenStyles.inputIcon} /></View>
          <TextInput
            label='Ryhmän nimi'
            value={this.state.groupname}
            onChangeText={text => this.setState({groupname:text})}
            style={StartScreenStyles.textInput}
          />
        </View>
        <Button mode="contained" style={[StartScreenStyles.button, StartScreenStyles.violetButton, StartScreenStyles.firstButton]} onPress={() => this.joinGroup()}>
          Liity Ryhmään
        </Button>
        <Button mode="contained" style={StartScreenStyles.button} onPress={() => console.log('Luo Ryhmä: ' + this.state.groupname)}>
          Luo Ryhmä
        </Button>
      </View>
    );
  }
}