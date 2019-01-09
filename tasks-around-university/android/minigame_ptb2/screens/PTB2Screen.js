import React from 'react';
import { Image, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { IconButton } from 'react-native-paper';

import PTB2Styles from '../styles/PTB2Styles';

// TouchableHighlight in ColoredButton class has empty Text element
// as its child as it requires exactly one child

// todo
// -tee ajasta jotenkin nopeentuva liukuvasti käytä pisteitä tai taulukon pituutta jollain 0.02 kertoimella

// Backend hommat:
// -startNewRound() :ssa hae painikejärjestys backendistä
// -endTheGame() :ssa lähetä backendiin että peli on päättynyt
// -checkEndStatus() :ssa tarkistetaan backendistä onko peli päättynyt (joku pelaajista lähettänyt tiedon siitä)
// -endTheGame() :ssa lähetä pisteet backendiin, tarviiko niitä?

class ColoredButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { backgroundColor, disabled } = this.props;
        const combined = StyleSheet.flatten([PTB2Styles.coloredButton, backgroundColor]);
        return (
            <TouchableHighlight disabled={ disabled } style={ combined } onPress={this.props.action}>
                <Text></Text>
            </TouchableHighlight>
        );
    }
}

export default class PTB2Screen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonOrder: [],
            buttonsPressed: [],
            hasGameEnded: false,
            explainer: false,
            buttonsDisabled: false,
            startButtonDisabled: true,
            gameMessage: 'Game starts in 5 seconds!',
            score: 0,
            debug: '',
            endCheck: '',
            redButtonStyle: {backgroundColor: 'darkred'},
            blueButtonStyle: {backgroundColor: 'blue'},
            greenButtonStyle: {backgroundColor: 'limegreen'},
            yellowButtonStyle: {backgroundColor: 'gold'},            
        };
        this.waitBeforeStarting();
    }
    
    startNewRound = () => {        
        // GET api/buttons, ota ne talteen parsable muuttujaan
        this.setState({gameMessage: ''});
        let parsable = JSON.parse('{"explainer":true,"buttons":[0, 3, 2, 1]}');
        let order = parsable["buttons"];
        this.setState({buttonOrder: order});
        if (parsable["explainer"]) {
            this.setState({buttonsDisabled: true});
            let i = 0;
            this.repeatOrder(order, 0);
        }
        this.setState({endCheck: setInterval(this.checkEndStatus, 1000)});
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
    }
    
    waitBeforeStarting = () => {
        var start = setTimeout(this.startNewRound, 5000);
    }
    
    checkOrder = (buttonPressed) => {
        let userInputs = this.state.buttonsPressed;
        let correctInputs = this.state.buttonOrder;
        userInputs.push(buttonPressed);
        
        let index = userInputs.length - 1;
        if (buttonPressed != correctInputs[index]) {
            this.endTheGame();
        }
        else {
            this.setState(prevState => ({
                score: prevState.score + 1
            }));
        }
    }
    
    endTheGame = () => {
        this.setState({hasGameEnded: true});
        this.setState({gameMessage: 'Game over!'});
        
        //lähetä backendiin että peli on päättynyt
        //lähetä pisteet backendiin tässä
    }
    
    checkEndStatus = () => {
        // tällä lopetetaan peli toisenkin käyttäjän ruudulta
        // GET api/ready
        // if (backend palauttaa true) {
        //    this.setState({hasGameEnded: true});
        // }
    }
    
    render() {
        return (
            <View style={PTB2Styles.container}>
                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.redButtonStyle} action={this.checkOrder.bind(null, 0)} />
                    <Text style={PTB2Styles.text}>Turn your phone sideways{"\n"}for better experience!</Text>
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.blueButtonStyle} action={this.checkOrder.bind(null, 1)} />
                    <Text style={PTB2Styles.text}>Score: {this.state.score}</Text>
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.greenButtonStyle} action={this.checkOrder.bind(null, 2)} />
                    <Text style={PTB2Styles.text}>{this.state.gameMessage}</Text>
                </View>
                
                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.yellowButtonStyle} action={this.checkOrder.bind(null, 3)} />
                </View>
            </View>
        );
    }
}
