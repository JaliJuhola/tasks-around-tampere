import React from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput, ProgressBar } from 'react-native-paper';

import AliasScreenStyles from '../styles/AliasScreenStyles';
import MinigameComponent from '../../common/MinigameComponent';

export default class AliasScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            words: ['sininen', 'fileesuikale', 'kanawokki', 'taskulaskin', 'ruutupaperi'],
            textInput: '',
            currentWord: ' ',
            correctWord: ' ',
            explainer: true,
            buttonDisabled: false,
            textInputDisabled: false,
            timeElapsed: 0,
            score: 0,
            latestScore: 0,
            scoreTimer: '',
            wordTimeout: '',
            debug: '',
            
        };
    }

    // This function first clears previous timers, requests a new JSON,
    // and sets the state accordingly to the new role. At the end this starts new timers.
    updateText = () => {
        clearTimeout(this.state.wordTimeout);
        this.setState({timeElapsed: 0});
        clearInterval(this.state.scoreTimer);
        
        // call for json();
        
        let rnd = Math.floor(Math.random() * 5);
        // backendiin tarkistus ettei tule kahta samaa
        while (this.state.words[rnd] == this.state.currentWord) {
            rnd = Math.floor(Math.random() * 5);
        }
        
        let parsable = '';
        switch(rnd) {
            case 0:
                parsable = JSON.parse('{"word":"sininen","explainer":true}');
                break;
            case 1:
                parsable = JSON.parse('{"word":"fileesuikale","explainer":false}');
                break;
            case 2:
                parsable = JSON.parse('{"word":"kanawokki","explainer":false}');
                break;
            case 3:
                parsable = JSON.parse('{"word":"taskulaskin","explainer":false}');
                break;
            case 4:
                parsable = JSON.parse('{"word":"ruutupaperi","explainer":true}');
                break;
            default:
                break;
        }
        
        //this.setState({explainer: parsable["explainer"]});
        this.setState({currentWord: parsable["word"]});
        this.setState({correctWord: ' '});
        
        if (parsable["explainer"] == true) {
            this.setState({buttonDisabled: true});
            this.setState({textInputDisabled: true});
        }
        else {
            this.setState({buttonDisabled: false});
            this.setState({textInputDisabled: false});
        }
        
        // settimeout call for json päivitä kaikille hae uus taulukollinen sanoja
        this.setState({wordTimeout: setTimeout(this.updateText, 20000)});
        this.setState({scoreTimer: setInterval(this.updateScoreTimer, 500)});
    }
    
    // This function keeps track of time elapsed on the current word
    updateScoreTimer = () => {
        this.setState(prevState => ({
            timeElapsed: prevState.timeElapsed + 0.5
        }));
    }
    
    // This function updates score followingly: <=5s elapsed gives 500 points,
    // >=15s elapsed gives 100 points, everything in between is linearly determined
    updateScore = () => {
        let points = 700 - (40 * this.state.timeElapsed);
        
        if (points > 500)
            points = 500;
        else if (points < 100)
            points = 100;
        
        this.setState({latestScore: points});
        this.setState(prevState => ({
            score: prevState.score + points
        }));
    }
    
    // This function checks if user's guess was right or wrong and updates things accordingly
    checkGuess = () => {
        let guess = this.state.textInput.toLowerCase();
        if (guess == this.state.currentWord) {
            clearTimeout(this.state.wordTimeout);
            clearInterval(this.state.scoreTimer);
            this.updateScore();
            this.updateText();
            this.setState({textInput: ''});
            this.setState({correctWord: 'Correct!'});
        }
        else {
            this.setState({textInput: ''});
            this.setState({correctWord: 'Wrong! :('});
            this.setState({latestScore: 0});
        }
    }
    
    render() {
        return (
            <View style={AliasScreenStyles.container}>
                <ProgressBar progress={(20 - this.state.timeElapsed) / 20} style={AliasScreenStyles.progressBar} />
                <Text style={AliasScreenStyles.text}>
                  Total score: {this.state.score}
                </Text>
                <Text style={AliasScreenStyles.textCorrect}>
                  {this.state.correctWord} +{this.state.latestScore}
                </Text>
                <Text style={AliasScreenStyles.text}>
                  {this.state.currentWord}
                </Text>
                <TextInput
                  disabled={this.state.textInputDisabled}
                  style={AliasScreenStyles.textInput}
                  placeholder='Guess the word!'
                  value={this.state.textInput}
                  onChangeText={textInput => this.setState({ textInput })}
                  onSubmitEditing={() => this.checkGuess()}
                />
                <Button mode='contained' disabled={this.state.buttonDisabled} style={AliasScreenStyles.button} dark='true' onPress={() => this.checkGuess()}>
                  Submit your guess
                </Button>
                <Button mode='contained' style={AliasScreenStyles.button} dark='true' onPress={() => this.updateText()}>
                  Next word
                </Button>
            </View>
        );
    }
}
