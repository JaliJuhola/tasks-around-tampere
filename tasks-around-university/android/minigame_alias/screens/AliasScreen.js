import React from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';

import AliasScreenStyles from '../styles/AliasScreenStyles';

export default class AliasScreen extends React.Component {
    //const words = ['sininen', 'hääyöaie', 'fileesuikale', 'kanawokki', 'ruutupaperi'];
    
    /*
    words = () => {
        let list = JSON.parse('{"words":[{"id":0,"word":"sininen"},{"id":1,"word":"hääyöaie"},{"id":2,"word":"fileesuikale"}]}');
        let key = 0;
        
        return list.words.map((entry) => {
            return ();
        });
    }
    */
    /*
    members = () => {
        Replace this with a connect to server and fetch JSON
        let list = JSON.parse('{"members":[{"id":0,"name":"Fuksi 777","role":"You","joined":true,"icon":"space-shuttle"},{"id":1,"name":"Koodikoira ","role":"Käpistelijäryhmä","joined":true,"icon":"connectdevelop"},{"id":2,"name":"Sakari ","role":"Käpistelijäryhmä","joined":true,"icon":"soccer-ball-o"},{"id":3,"name":"Jokuvaa ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"},{"id":4,"name":"TestName ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"}]}');
        let key = 0;
        
        return list.members.map((item) => {
            return (<LobbyCard key={item.id} name={item.name} role={item.role} joined={item.joined} icon={item.icon}/>);
        });
    }
    */
    
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