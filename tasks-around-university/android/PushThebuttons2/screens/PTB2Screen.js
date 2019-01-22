import React from 'react';
import { Image, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { IconButton } from 'react-native-paper';

import PTB2Styles from '../styles/PTB2Styles';
import { MainView } from '../../common/Components/MainView';

class ColoredButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loadingTitle: "Odotetaan muita pelaajia"
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
            click_count: 0,
            hasGameEnded: false,
            explainer: false,
            buttonsDisabled: false,
            startButtonDisabled: true,
            gameMessage: 'Game starts in 5 seconds!',
            score: 0,
            currentTimeout: 4000,
            currentClick: 0,
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
        this.setState({gameMessage: ''});
        // starts with button 0
        let order = [0]
        this.setState({buttonsDisabled: false, buttonOrder: order});
        this.repeatOrder(order, 0);
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
            var t = setTimeout(this.repeatOrder(null, button, k), 200);
        }
    }

    repeatOrder = (buttonsOrder, j) => {
        var timer = '';
        let buttons = buttonsOrder;
        let currentButton = buttons[j];
        var random_button = Math.floor(Math.random() * 10);
        var random_button2 = Math.floor(Math.random() * 10);

        var buttonList = this.state.buttonOrder;
        buttonList.append(random_button);
        buttonList.append(random_button2);
        switch(currentButton) {
            case 0:
                j++;
                this.setState({redButtonStyle: {backgroundColor: 'red'}});
                timer = setTimeout(this.turnOffLight(null, buttons, j, currentButton), this.state.currentTimeout);
                break;
            case 1:
                j++;
                this.setState({blueButtonStyle: {backgroundColor: 'cyan'}});
                timer = setTimeout(this.turnOffLight(null, buttons, j, currentButton), this.state.currentTimeout);
                break;
            case 2:
                j++;
                this.setState({greenButtonStyle: {backgroundColor: 'lime'}});
                timer = setTimeout(this.turnOffLight(null, buttons, j, currentButton), this.state.currentTimeout);
                break;
            case 3:
                j++;
                this.setState({yellowButtonStyle: {backgroundColor: 'yellow'}});
                timer = setTimeout(this.turnOffLight(null, buttons, j, currentButton), this.state.currentTimeout);
                break;
            default:
                break;
        }
    }

    waitBeforeStarting = () => {
        setTimeout(this.startNewRound, 5000);
    }

    checkOrder = (buttonPressed) => {
        if (buttonPressed !== this.state.buttonOrder[this.state.click_count]) {
            this.endTheGame();
        }
        else {
            this.setState({
                currentTimeout: this.state.currentTimeout - 50, score: this.state.score + 1, click_count: this.state.click_count + 1
            })
        }
    }

    endTheGame = () => {
        this.setState({hasGameEnded: true});
        this.setState({gameMessage: 'Game over!'});
    }

    render() {
        return (
            <MainView isLoading={this.state.isLoading} loadingTitle={this.state.loadingTitle}>
                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.redButtonStyle} action={this.checkOrder(null, 0)} />
                    <Text style={PTB2Styles.text}>Turn your phone sideways{"\n"}for better experience!</Text>
                </View>

                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.blueButtonStyle} action={this.checkOrder(null, 1)} />
                    <Text style={PTB2Styles.text}>Pisteesi: {this.state.score}</Text>
                </View>

                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.greenButtonStyle} action={this.checkOrder(null, 2)} />
                    <Text style={PTB2Styles.text}>{this.state.gameMessage}</Text>
                </View>

                <View style={PTB2Styles.row}>
                    <ColoredButton disabled={this.state.buttonsDisabled} backgroundColor={this.state.yellowButtonStyle} action={this.checkOrder(null, 3)} />
                </View>
            </MainView>
        );
    }
}
