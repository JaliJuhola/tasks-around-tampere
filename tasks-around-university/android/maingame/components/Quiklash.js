import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Bubbles} from 'react-native-loader';



export class QuiklashScreen extends React.Component {

  state = {
    username: '',
    groupname: '',
    question: 'Question will go here',
    view: 1,
    loading: false,
    loadingMessage: '',
    voteText: '',
    vote: {"question":"test","choice":["test0","test1"]},
    disableVote: false,
    temp: 0,
  };

  playerReady(){
    //Player is ready, get info when others are ready from server
    //Also get the first question
    console.log(this.state.temp);
    if(this.state.view == 1){
      this.setState({
        view : 0,
        loading : true,
        loadingMessage: 'Waiting for other players!'
      });
      this.getQuestion();
    }
    if(this.state.view == 2){
      this.setState({
        view : 0,
        loading : true,
        loadingMessage: 'Please wait a moment!'
      });
      //Send the answer here, then continue forward when received
      var response;
      if(this.state.temp == 1)
        response = JSON.parse('{"more":true, "ready": true}');
      else
        response = JSON.parse('{"more":false, "ready": true}');
      setTimeout( () =>{
        if(response.more)
          this.getQuestion();
        else if(response.ready){
          response = JSON.parse('{"question":"What kittens would say if they could talk","choice":["I tolerate your precence, now give me FOOD","MURDER"]}');
          this.setState({
            view : 3,
            loading : false,
            voteText : ["Vote for your favourite answer!","",""],
            vote : response,
          });
        }
      }, 3000);
    }
    if(this.state.view == 3){
      this.setState({
        view : 0,
        loading : true,
        loadingMessage: 'Please wait a moment!'
      });
      //Send the answer here, then continue forward when received
      var response;
      if(this.state.temp == 1)
        response = JSON.parse('{"more":true, "ready": true}');
      else
        response = JSON.parse('{"more":false, "ready": true}');
      setTimeout( () =>{
        if(response.more)
          this.getQuestion();
        else if(response.ready){
          response = JSON.parse('{"question":"What kittens would say if they could talk","choice":["I tolerate your precence, now give me FOOD","MURDER"]}');
          this.setState({
            view : 3,
            loading : false,
            voteText : ["Vote for your favourite answer!","",""],
            vote : response,
          });
        }
      }, 3000);
    }
  }

  getQuestion(){
    var response;
    if(this.state.temp == 0){
      response = JSON.parse('{"ready":true,"question":"What kittens would say if they could talk"}');
      this.state.temp++;
    }
    else{
      response = JSON.parse('{"ready":true,"question":"Trash talk you would hear at a chess meet"}');
      this.state.temp++;
    }
    setTimeout( () =>{
        if(response.ready)
          this.setState({
            view : 2,
            loading : false,
            question : response.question,
          });
    }, 3000);

  }

  vote(){
    this.setState({
      disableVote:true,
      loading:true,
      voteText:["Waiting for everybody to vote.","",""],
    });
    var response = JSON.parse('{"ready":true,"votes":[3,2]}');
    setTimeout( () =>{
        if(response.ready)
          this.setState({
            loading : false,
            voteText: ["The results of the vote are here:",response.votes[0],response.votes[1]],
          });
    }, 3000);
    console.log("vote");
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.view == 1 && <Start handler ={ () => this.playerReady()} />}
        {this.state.view == 2 && <Question question = {this.state.question} handler ={ () => this.playerReady()} />}
        {this.state.view == 3 && <Vote voteText = {this.state.voteText} vote = {this.state.vote} disable = {this.state.disableVote} handler ={ () => this.vote()} />}
        {this.state.loading && <View style={styles.loading}><Headline style={styles.headline}>{this.state.loadingMessage}</Headline><Bubbles size={10} color="purple" /></View>}
      </View>
    );
  }
}

class Start extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Headline style={styles.headline}>Welcome to Quiqlash!</Headline>
        <Text style={styles.text}>Quiqlash is a game where you try to think of the funniest possible answer to different questions.</Text>
        <Text style={styles.text}>After everybody has submitted their answers, you will get to vote on head-to-head battles, which answer was the funniest!</Text>
        <Text style={styles.text}>Let the battle of wits begin!</Text>
        <Button style={styles.button} mode="contained" onPress={() => this.props.handler()}><Text style={styles.buttonText}>I'm ready!</Text></Button>
      </View>
    );
  }
}

class Question extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Headline style={styles.headline}>{this.props.question}</Headline>
        <TextInput/>
        <Button style={styles.button} mode="contained" onPress={() => this.props.handler()}><Text style={styles.buttonText}>Submit!</Text></Button>
      </View>
    );
  }
}
class Vote extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Headline style={styles.headline}>{this.props.voteText[0]}</Headline>
        <Text>Question was:</Text>
        <Headline>{this.props.vote.question}</Headline>
        <Button disabled={this.props.disable} style={styles.voteButton} mode="contained" onPress={() => this.props.handler()}><Text style={styles.buttonText}>{this.props.vote.choice[0]}</Text></Button>
        <Text>{this.props.voteText[1]}</Text>
        <Button disabled={this.props.disable} style={styles.voteButton} mode="contained" onPress={() => this.props.handler()}><Text style={styles.buttonText}>{this.props.vote.choice[1]}</Text></Button>
        <Text>{this.props.voteText[2]}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  text: {
    paddingBottom: 10,
    textAlign: 'left',
    fontSize: 18,
  },
  headline: {
    paddingBottom: 30,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    marginTop: 40,
    paddingVertical: 25,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 30,
  },
  loading:{
    width: '100%',
    alignItems: 'center',
  }
});