import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, RadioButton, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Auth} from '../../core/auth/auth';
/*Stylesheets*/
import StartScreenStyles from '../styles/StartScreenStyles';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';


class SelectIcon extends React.Component {
  state = {
    selectedIcon: '',
  };

  selectIcon(){
    Http.post('api/avatar',{
        icon_name: this.state.selectIcon,
    }).then(function (response) {
        Actions.main_map();
    }).catch(function (error) {
        alert("failed to set avatar!");
    });

  }

  static navigationOptions = {
    title: 'Valitse avatar',
  };
  render() {
    return (
      <View style={StartScreenStyles.container}>
        <Image
          source={require('../../assets/images/tay.jpg')}
          style={StartScreenStyles.backgroundImage}
          blurRadius={1}
        />
        <ScrollView>
            <RadioButton.Group
            onValueChange={value => this.setState({ selectedIcon: value })}
            value={this.state.selectedIcon}>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="space-shuttle" size={60} />
                    <RadioButton value="space-shuttle" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="connectdevelop" size={60} />
                    <RadioButton value="connectdevelop" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="soccer-ball-o" size={60} />
                    <RadioButton value="soccer-ball-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="suitcase" size={60} />
                    <RadioButton value="suitcase" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="smile-o" size={60} />
                    <RadioButton value="smile-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="puzzle-piece" size={60} />
                    <RadioButton value="puzzle-piece" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="ship" size={60} />
                    <RadioButton value="ship" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="star-o" size={60} />
                    <RadioButton value="star-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="qrcode" size={60} />
                    <RadioButton value="qrcode" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="space-shuttle" size={60} />
                    <RadioButton value="space-shuttle" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="connectdevelop" size={60} />
                    <RadioButton value="connectdevelop" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="soccer-ball-o" size={60} />
                    <RadioButton value="soccer-ball-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="suitcase" size={60} />
                    <RadioButton value="suitcase" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="smile-o" size={60} />
                    <RadioButton value="smile-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="puzzle-piece" size={60} />
                    <RadioButton value="puzzle-piece" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="ship" size={60} />
                    <RadioButton value="ship" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="star-o" size={60} />
                    <RadioButton value="star-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="qrcode" size={60} />
                    <RadioButton value="qrcode" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center',alignItems: 'center', marginTop: 25}}>
                    <Icon name="space-shuttle" size={60} />
                    <RadioButton value="space-shuttle" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}} />
                    <Icon name="connectdevelop" size={60} />
                    <RadioButton value="connectdevelop" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                    <Icon name="soccer-ball-o" size={60} />
                    <RadioButton value="soccer-ball-o" style={{justifyContent: 'center',alignItems: 'center', marginLeft: 25}}/>
                </View>
        </RadioButton.Group>
      </ScrollView>
        <Button mode="contained" style={[StartScreenStyles.button, StartScreenStyles.violetButton, StartScreenStyles.firstButton]} onPress={() => this.selectIcon()}>
          Aloita peli
        </Button>
      </View>
    );
  }
}
export default SelectIcon;