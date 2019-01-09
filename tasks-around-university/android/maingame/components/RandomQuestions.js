import React from 'react';
import { StyleSheet, Text, View, Image, Button, Animated, TouchableHighlight } from 'react-native';
import MapStyles from '../styles/MapStyles';
import TimerMixin from 'react-timer-mixin';
import QuestionData from './QuestionData.json';

export default class RandomQuestions extends React.Component {

  state = {

    markerNearUser: false,
    userIsLeader: true,
    currentQuestionIndex: 0,
    currentQuestion: null,
    intervalOn: false,
    intervalId: null,
    intervalChance: 0.35,
    intervalDuration: 15000,
    closingDuration: 25000,
    closingId: null,
    questionIsHidden: true,

    questionSlideValue: new Animated.Value(-200),

    questions: QuestionData.questions,
  };

  componentDidMount() {
    if(this.state.userIsLeader) {
      this.handleRandomQuestions();
    }
  }

  //Toggles the question view
  toggleQuestionView() {

    toValue = -200;

    if(this.state.questionIsHidden) {
      toValue = 0;
    }

    Animated.spring(
      this.state.questionSlideValue,
      {
        toValue: toValue,
        velocity: 5,
        tension: 2,
        friction: 8,
      }
    ).start();

    this.state.questionIsHidden = !this.state.questionIsHidden;
  }

  //Shows random questions based on the interval
  handleRandomQuestions() {
    if(!this.state.intervalOn && this.state.questions.length > 0) {

      this.setState({intervalOn: true});
      firstInterval = true;
      id = TimerMixin.setInterval(() => {

        //The first interval cannot show a question
        if(!firstInterval) {

          //Shows a question if the conditions are true
          if(!this.state.markerNearUser && this.getOdds(this.state.intervalChance)) {
            clearInterval(this.state.intervalId);
            this.setState({intervalOn: false});

            //Choosing a random question
            randomQuestion = Math.floor( 1 + (Math.random() * (this.state.questions.length))) - 1;
            this.setState({currentQuestionIndex: randomQuestion});
            this.setState({currentQuestion: this.state.questions[this.state.currentQuestionIndex].questionText});
            this.setState({currentAnswer1: this.state.questions[this.state.currentQuestionIndex].answerText1});
            this.setState({currentAnswer2: this.state.questions[this.state.currentQuestionIndex].answerText2});

            //Removing the question from the array so that the same question cannot be chosen again
            this.removeQuestion(this.state.currentQuestionIndex);

            this.startClosingTimer();
            this.toggleQuestionView()
          }
        }
        else {
          firstInterval = false;
        }
      }, this.state.intervalDuration);
      this.setState({intervalId: id});
    }
  }

  startClosingTimer() {
    id = TimerMixin.setInterval(() => {

      clearInterval(this.state.closingId);
      if(!this.state.questionIsHidden) {
        this.handleRandomQuestions();
        this.toggleQuestionView();
      }
    }, this.state.closingDuration)
    this.setState({closingId: id});
  }
  
  //Returns true or false based on the odds
  getOdds(odds) {
    d = Math.random();
    if(d < odds) {
      return true;
    }
    else {
      return false;
    }
  }

  //Removes a question from the array
  removeQuestion(index) {
    var array = [...this.state.questions];
    array.splice(index, 1);
    this.setState({questions: array});
  }

  render() {
    return (
        <Animated.View style={[MapStyles.questionContainer, {transform: [{translateY: this.state.questionSlideValue}]}]}>
            <Text style={MapStyles.questionText}>{this.state.currentQuestion}</Text>
            <View style={MapStyles.answerTextContainer}>
              <TouchableHighlight
                  underlayColor= 'white'
                  style={MapStyles.answerButton}
                  onPress={() => {
                    if(!this.state.questionIsHidden) {
                      clearInterval(this.state.closingId);
                      this.handleRandomQuestions();
                      this.toggleQuestionView();
                    }
                  }}>
                  <Text style={MapStyles.answerText}>Close</Text>
              </TouchableHighlight>
            </View>
        </Animated.View>
    );
  }
}