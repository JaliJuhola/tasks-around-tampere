import React from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';

import AliasScreenStyles from '../styles/AliasScreenStyles';

export class AliasScreen extends React.Component {
    state = {
        words: ['sininen', 'hääyöaie', 'fileesuikale', 'kanawokki', 'ruutupaperi'],
        textInput: '',
        currentWord: 'apua',
        correctWord: '',
        explainer: true,
        buttonDisabled: false,
        textInputDisabled: false,
    };

    updateText = () => {
        let rnd = Math.floor(Math.random() * 5);
        // backendiin tarkistus ettei tule kahta samaa
        while (this.state.words[rnd] == this.state.currentWord) {
            rnd = Math.floor(Math.random() * 5);
        }
        this.setState({currentWord: this.state.words[rnd]});
        this.setState({correctWord: ''});
        //this.setState({currentWord: 'hälytys apua:D'});

        /*
        if (this.state.explainer) {
            this.setState({buttonDisabled: true});
            this.setState({textInputDisabled: true});
        }
        else {
            this.setState({buttonDisabled: false});
            this.setState({textInputDisabled: false});
        }
        */
    }

    checkGuess = () => {
        let guess = this.state.textInput.toLowerCase();
        if (guess == this.state.currentWord) {
            this.updateText();
            this.setState({textInput: ''});
            this.setState({correctWord: 'Correct!'});
        }
        else {
            this.setState({textInput: ''});
            this.setState({correctWord: 'Wrong! :('});
        }
    }

    render() {
        return (
            <View style={AliasScreenStyles.container}>
                <Text style={AliasScreenStyles.textCorrect}>
                  {this.state.correctWord}
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