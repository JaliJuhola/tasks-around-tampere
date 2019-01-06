import React from 'react';
import { Image, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { IconButton } from 'react-native-paper';

import PTB2Styles from '../styles/PTB2Styles';

// TouchableHighlight has empty Text element as its child as it requires
// exactly one child

// todo tarkista että yksikään if tai else lause ei ole ilman {}
// -tee ajasta jotenkin nopeentuva liukuvasti käytä pisteitä tai taulukon pituutta jollain 0.02 kertoimella
// -randomoi sequence
// -pisteet
// -backendistä tulee rooli ja sequence
// -huolehdi että explainer ei saa pisteitä omista painalluksista eikä peli lopu niistä

class ColoredButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    // flatten PTB2Styles.coloredButton ja se mikä tulee parametrinä
    
    render() {
        const { backgroundColor } = this.props;
        const combined = StyleSheet.flatten([PTB2Styles.coloredButton, backgroundColor]);
        return (
            <TouchableHighlight style={ combined } onPress={this.props.action}>
                <Text></Text>
            </TouchableHighlight>
        );
    }
}

export default class PTB2Screen extends React.Component {

    // NOTES:
    // -remove startNewRound from button
    
    constructor(props) {
        super(props);
        this.state = {
            buttonOrder: [],
            buttonsPressed: [],
            hasGameEnded: false,
            explainer: false,
            debug: '',
            buttonFlashInterval: '',
            redButtonStyle: {backgroundColor: 'darkred'},
            blueButtonStyle: {backgroundColor: 'blue'},
            greenButtonStyle: {backgroundColor: 'limegreen'},
            yellowButtonStyle: {backgroundColor: 'gold'},
            
        };
    }
    
    changeWord = () => {
        this.setState({debug: 'deeebuug'});
    }
    
    startNewRound = () => {
        // random 5 integers from 0-3
        /*
        newButtons = [];
        let i;
        for (i = 0; i < 5; i++) {
            let rnd = Math.floor(Math.random() * 4);
            newButtons[i] = rnd;
        }
        this.setState({buttonOrder: newButtons});
        */
        
        // GET api/sequence
        let parsable = JSON.parse('{"explainer":true,"buttons":[0, 3, 2, 1]}');
        //let order = [0, 3, 2, 1];
        let order = parsable["buttons"];
        this.setState({buttonOrder: order});
        if (parsable["explainer"]) {
            let i = 0;
            this.repeatOrder(order, 0);
        }
    }
    
    turnOffLight = (button, k, buttonID) => {
        switch(buttonID) {
            case 0:
                this.setState({redButtonStyle: {backgroundColor: 'darkred'}});
                break;
            case 1:
                this.setState({blueButtonStyle: {backgroundColor: 'blue'}});
                break;
            case 2:
                this.setState({greenButtonStyle: {backgroundColor: 'limegreen'}});
                break;
            case 3:
                this.setState({yellowButtonStyle: {backgroundColor: 'gold'}});
                break;
            default:
                break;
        }
        //this.setState({yellowButtonStyle: {backgroundColor: 'gold'}});
        if (k < button.length && !this.state.hasGameEnded) {
            var t = setTimeout(this.repeatOrder.bind(null, button, k), 200);
        }
    }
    
    repeatOrder = (buttonsOrder, j) => {
        var timer = '';
        let buttons = buttonsOrder;
        let currentButton = buttons[j];
        switch(currentButton) {
            case 0:
                j++;
                this.setState({redButtonStyle: {backgroundColor: 'red'}});
                timer = setTimeout(this.turnOffLight.bind(null, buttons, j, currentButton), 750);
                break;
            case 1:
                j++;
                this.setState({blueButtonStyle: {backgroundColor: 'cyan'}});
                timer = setTimeout(this.turnOffLight.bind(null, buttons, j, currentButton), 750);
                break;
            case 2:
                j++;
                this.setState({greenButtonStyle: {backgroundColor: 'lime'}});
                timer = setTimeout(this.turnOffLight.bind(null, buttons, j, currentButton), 750);
                break;
            case 3:
                j++;
                this.setState({yellowButtonStyle: {backgroundColor: 'yellow'}});
                timer = setTimeout(this.turnOffLight.bind(null, buttons, j, currentButton), 750);
                break;
            default:
                break;
        }
            //start flash at [i] startFlash()
            //end flash at [i] endFlash()
            //settimeout jolla odotetaan hetki ennen uutta kierrosta, tee siitä flexible nopeuttaaksesi
            
            //repeatorder = (order[], i) => {}
            
            //turnofflight huolehtis repeatorderin uudelleenkäytöstä? parametrinä myös order[i] 
    }
    
    toggleColor = () => {
        
    }
    
    checkOrder = (buttonPressed) => {
        let userInputs = this.state.buttonsPressed;
        let correctInputs = this.state.buttonOrder;
        userInputs.push(buttonPressed);
        let i;
        for (i = 0; i < userInputs.length; i++) {
            if (userInputs[i] != correctInputs[i]) {
                this.setState({hasGameEnded: true});
            }
        }
    }
    
    render() {
        return (
            <View style={PTB2Styles.container}>
                <View style={PTB2Styles.row}>
                    <ColoredButton backgroundColor={this.state.redButtonStyle} action={this.checkOrder.bind(null, 0)} />
                    <ColoredButton backgroundColor={this.state.redButtonStyle} action={this.startNewRound} />
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton backgroundColor={this.state.blueButtonStyle} action={this.checkOrder.bind(null, 1)} />
                    <ColoredButton backgroundColor={this.state.blueButtonStyle} action={this.changeWord} />
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton backgroundColor={this.state.greenButtonStyle} action={this.checkOrder.bind(null, 2)} />
                    <ColoredButton backgroundColor={this.state.greenButtonStyle} action={this.checkOrder} />
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton backgroundColor={this.state.yellowButtonStyle} action={this.checkOrder.bind(null, 3)} />
                    <ColoredButton backgroundColor={this.state.yellowButtonStyle} action={this.checkOrder} />
                </View>
            </View>
        );
    }
}
