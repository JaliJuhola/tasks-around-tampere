import React from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { IconButton } from 'react-native-paper';

import PTB2Styles from '../styles/PTB2Styles';

export default class PTB2Screen extends React.Component {

    // NOTES:
    // -remove startNewRound from button
    
    constructor(props) {
        super(props);
        this.state = {
            buttonOrder: [],
            debug: '',
            buttonFlashInterval: '',
            
        };
    }
    
    changeWord = () => {
        this.setState({debug: 'deeebuug'});
    }
    
    startNewRound = () => {
        // random 5 integers from 0-3
        newButtons = [];
        let i;
        for (i = 0; i < 5; i++) {
            let rnd = Math.floor(Math.random() * 4);
            newButtons[i] = rnd;
        }
        this.setState({buttonOrder: newButtons});
    }
    
    checkOrder = () => {
        
    }
    
    render() {
        return (
            <View style={PTB2Styles.container}>
                <View style={PTB2Styles.row}>
                    <TouchableHighlight style={PTB2Styles.redButton} onPress={this.checkOrder}>
                      <IconButton
                        icon="brightness-1"
                        color={"red"}
                        size={0}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight style={PTB2Styles.redButton} onPress={this.startNewRound}>
                      <IconButton
                        icon="brightness-1"
                        color={"red"}
                        size={0}
                      />
                    </TouchableHighlight>
                </View>
                
                <View style={PTB2Styles.row}>
                    <TouchableHighlight style={PTB2Styles.blueButton} onPress={this.checkOrder}>
                      <IconButton
                        icon="brightness-1"
                        color={"blue"}
                        size={0}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight style={PTB2Styles.blueButton} onPress={this.changeWord}>
                      <IconButton
                        icon="brightness-1"
                        color={"blue"}
                        size={0}
                      />
                    </TouchableHighlight>
                </View>
                
                <View style={PTB2Styles.row}>
                    <TouchableHighlight style={PTB2Styles.greenButton} onPress={this.checkOrder}>
                      <IconButton
                        icon="brightness-1"
                        color={"green"}
                        size={0}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight style={PTB2Styles.greenButton} onPress={this.changeWord}>
                      <IconButton
                        icon="brightness-1"
                        color={"green"}
                        size={0}
                      />
                    </TouchableHighlight>
                </View>
                
                <View style={PTB2Styles.row}>
                    <TouchableHighlight style={PTB2Styles.yellowButton} onPress={this.checkOrder}>
                      <IconButton
                        icon="brightness-1"
                        color={"yellow"}
                        size={0}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight style={PTB2Styles.yellowButton} onPress={this.changeWord}>
                      <IconButton
                        icon="brightness-1"
                        color={"yellow"}
                        size={0}
                      />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
