import React from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput, ProgressBar } from 'react-native-paper';

import AliasScreenStyles from '../styles/AliasScreenStyles';
import MinigameComponent from '../../common/MinigameComponent';

export default class AliasScreen extends React.Component {
    
    /*
    TODO:
    -nextword miinus pisteitä, selittäjälle yhtä paljon pisteitä kuin arvaajalle?
    -peli loppuu kesken sanan
    -progressbarissa fixed values
    -loppuscreen pisteille
    if ready AND explainer true -> give points
    this way explainer gets some points as well
    if state.explainer true -> reduce points
    
    
    // Backend hommat:
    -updateText() GET api/word ks. api channel slack
    -checkReadyStatus() GET api/ready, palauttaa true mikäli yksikin pelaajista on lähettänyt ready statuksen
        readyForNext() :stä
    -endRound() POST api/scores
    -end screen puuttuu joten vielä ei ole mitään mihin hakea pisteet
    
    */
    
    constructor(props) {
        super(props);
        this.state = {
            words: '',
            textInput: '',
            currentWord: 'Game starts in 5 seconds!',
            correctWord: ' ',
            explainer: true,
            buttonDisabled: false,
            textInputDisabled: false,
            nextWordDisabled: false,
            timeElapsed: 0,
            totalTimeElapsed: 0,
            score: 0,
            latestScore: 0,
            scoreTimer: '',
            wordTimeout: '',
            readyCheck: '',
            roundTimeout: '',
            remainingTimeout: '',
            debug: '',
            
        };
        
        let t = setTimeout(this.waitForNewWord, 5000);
    }
    
    // This function first clears previous timers, requests a new JSON,
    // and sets the state accordingly to the new role. At the end this starts new timers.
    updateText = () => {        
        // GET api/words
        // ota muuttujaan "parsable" kiinni mitä backend palauttaakaan
        // vedä se JSON.parsen läpi, alla esimerkki
        
        // backendiin tarkistus ettei tule kahta samaa?
        let rnd = Math.floor(Math.random() * 3);
        let parsable = '';
        switch(rnd) {
            case 0:
                parsable = JSON.parse('{"words":"kalakukko","explainer":true}');
                break;
            case 1:
                parsable = JSON.parse('{"words":"munakas","explainer":false}');
                break;
            case 2:
                parsable = JSON.parse('{"words":"kovalevy","explainer":false}');
                break;
            default:
                break;
        }
        
        // GET api/words ends here
        
        this.setState({timeElapsed: 0});
        this.setState({correctWord: ' '});
        this.setState({words: parsable["words"]});
        
        if (parsable["explainer"] == true) {
            this.setState({currentWord: parsable["words"]});
            this.setState({buttonDisabled: true});
            this.setState({textInputDisabled: true});
            this.setState({nextWordDisabled: false});
        }
        else {
            this.setState({currentWord: "Another player is explaining now!"});
            this.setState({buttonDisabled: false});
            this.setState({textInputDisabled: false});
            this.setState({nextWordDisabled: true});
        }
        
        this.setState({roundTimeout: setTimeout(this.endRound, 180000)});
        this.setState({wordTimeout: setTimeout(this.waitForNewWord, 30000)});
        this.setState({scoreTimer: setInterval(this.updateScoreTimer, 500)});
        this.setState({readyCheck: setInterval(this.checkReadyStatus, 1000)});
    }
    
    endRound = () => {
        
        clearTimeout(this.state.wordTimeout);
        clearInterval(this.state.scoreTimer);
        clearInterval(this.state.readyCheck);
        this.setState({currentWord: 'Game over!'});
        
        // POST api/scores
        // send this.state.score to backend from here
        
        // barebones for letting the word to finish nvm this
        /*
        clearTimeout(this.state.wordTimeout);
        let remaining = (20 - this.state.timeElapsed) * 1000;
        this.setState({remainingTimeout: setTimeout(this.waitForWordToFinish, remaining)});
        */
    }
    
    /*
    barebones for letting the word to finish before ending the game nvm this
    
    waitForWordToFinish = () => {
        clearTimeout(this.state.wordTimeout);
        clearInterval(this.state.scoreTimer);
        //clearInterval(this.state.readyCheck);
        this.setState({currentWord: 'Game over!'});
    }
    */
    
    waitForNewWord = () => {
        clearTimeout(this.state.wordTimeout);
        clearInterval(this.state.scoreTimer);
        clearInterval(this.state.readyCheck);
        this.setState({currentWord: 'Prepare for a new word...'});
        let t = setTimeout(this.updateText, 3000);
    }
        
    checkReadyStatus = () => {
        // this will be our every second check to backend
        // normally execute the stuff in here only if return value is true
        // return true if anyone of the players sent "ready" as their status in readyForNext()
        
        // GET api/ready
        // if (backend palauttaa true)
        // this.waitForNewWord();
    }
    
    readyForNext = () => {
        // POST api/ready
        // either from first guess or if explainer presses next word
        
    }
    
    // This function keeps track of time elapsed on the current word
    updateScoreTimer = () => {
        this.setState(prevState => ({
            timeElapsed: prevState.timeElapsed + 0.5
        }));
    }
    
    updateTotalTimer = () => {
        this.setState(prevState => ({
            totalTimeElapsed: prevState.totalTimeElapsed + 0.5
        }));
    }
    
    // This function updates score followingly: <=10s elapsed gives 500 points,
    // 30s elapsed (max time per word) gives 100 points, everything in between is linearly determined
    updateScore = () => {
        let points = 700 - (20 * this.state.timeElapsed);
        
        if (points > 500) {
            points = 500;
        }
        
        this.setState({latestScore: points});
        this.setState(prevState => ({
            score: prevState.score + points
        }));
    }
    
    // This function checks if user's guess was right or wrong and updates things accordingly
    checkGuess = () => {
        if (this.state.currentWord != "Game over!") {
            let guess = this.state.textInput.toLowerCase();
            if (guess == this.state.words) {
                clearInterval(this.state.scoreTimer);
                this.updateScore();
                this.setState({textInput: ''});
                this.setState({correctWord: 'Correct!'});
                this.readyForNext();
            }
            else {
                this.setState({textInput: ''});
                this.setState({correctWord: 'Wrong! :('});
                this.setState({latestScore: 0});
            }
        }
    }
    
    render() {
        return (
            <View style={AliasScreenStyles.container}>
                <ProgressBar progress={(30 - this.state.timeElapsed) / 30} style={AliasScreenStyles.progressBar} />
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
                <Button mode='contained' disabled={this.state.nextWordDisabled} style={AliasScreenStyles.button} dark='true' onPress={() => this.readyForNext()}>
                  Next word
                </Button>
            </View>
        );
    }
}
