import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Http} from '../core/connections/http';
import { Actions } from 'react-native-router-flux';

/*
 * A simple timer component that displays time elapsed since component mounting.
 * Time is displayed in "min:secs" format.
 */
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secs: this.props.secs,
      mins: this.props.mins,
    };
  }

  componentDidMount() {
    this.start = new Date().getTime();
    this.interval = setInterval(() => {
      var distanceSecs = ((new Date()).getTime() - this.start) / 1000;
      var minutes = Math.floor(distanceSecs / 60);
      var seconds = Math.floor(distanceSecs - (minutes * 60));

      this.setState({
        mins: minutes,
        secs: seconds
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text style={this.props.style}>
        Time elapsed:
        {this.state.mins}:
        {(this.state.secs < 10) ? ("0" + this.state.secs) : this.state.secs}
      </Text>
    );
  }

}

const tuniColor = '#4e008e';

/*
 * Styles for the Geocache component
 */
const geoStyles = StyleSheet.create({
  button: {
    color: 'black'
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 10
  },
  container: {
    flex: 1
  },
  contents: {
    flex: 8,
    justifyContent: 'space-around'
  },
  header: {
    alignItems: 'stretch',
    backgroundColor: tuniColor,
    justifyContent: 'flex-end',
    flex: 1
  },
  widget: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: tuniColor,
    justifyContent: 'center',
    flex: 1/5,
    marginHorizontal: 40
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#D3D3D3',
    color: '#A9A9A9',

  },
  headerText: {
    fontSize: 28
  }
});

/*
 * Main component of this app.
 */
export class GeocacheScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerStr: '',
      fails: 0,
      hintsUsed: 0,
      currentRiddle: "",
      current_score: 0,
      seconds: 0,
      minutes: 0,
      triesLeft: 6,

    };
    this.activate_channels_new_riddle = this.activate_channels_new_riddle.bind(this);
    this.sendQuess = this.sendQuess.bind(this);

    // Save the starting time of the game (used in scoring).
    this.startTime = new Date().getTime();
  }

  componentDidMount() {
      var self = this;
      Http.get('api/geocache/',{answer: self.state.answerStr
      }).then(function (response) {
        self.setState({
          currentRiddle: response['data']['riddle'],
          groupId: response['data']['group_id']
        });
        self.activate_channels_new_riddle();
      })
  }

  activate_channels_new_riddle = () => {
    var that = this;
    var channel = that.pusher.subscribe('geocache-' + that.state.groupId);
    channel.bind('new-riddle', function(data) {
      console.log("hue");
      const riddle = data['riddle'];
      const current_score = data['current_score'];
      const tries = data['tries'];
      if(current_score === that.state.currentScore) {
        if(!riddle || tries >= 6) {
          Actions.main_map();
        }
        that.setState(previousState => {
          return { triesLeft: that.state.triesLeft - 1, tries: 6 - tries};
          });
      } else {
        that.setState(previousState => {
          return { currentRiddle: riddle, currentScore: current_score, tries: 6 - tries};
        });
      }
    });
    return channel;
  }

  // TODO: send score to server.
  // Uses time (time), fails (int) and hintsUsed (int) for calculation.
  sendQuess = () => {
    var self = this;
    Http.patch('api/geocache/',{answer: self.state.answerStr
    }).then(function (response) {
      console.log(response['data']);
      if(!response['data']['status']) {
        self.setState({answerStr: ""});
      }
    });
  }

  render() {
    return (
      <View style={geoStyles.container}>
        <View style={geoStyles.header}>
          <Text style={[geoStyles.text, geoStyles.headerText]}>
            Geocache
            </Text>
        </View>
        <View style={geoStyles.contents}>

          <View style={geoStyles.widget}>
            <View></View>
            <Text style={geoStyles.text}>
              {this.state.currentRiddle}
            </Text>
            <View></View>
          </View>
          <View style={geoStyles.widget}>
            <TextInput
              placeholder="Type your answer here!"
              onChangeText={(text) => this.setState({ answerStr: text })}
              style={geoStyles.textInput}
            />
            <View style={geoStyles.buttonContainer}>
              <Button
                style={geoStyles.button}
                color={geoStyles.button.color}
                onPress={() => {
                  this.sendQuess()
                }}
                title="Submit"
              />
            </View>
          </View>
          <View style={geoStyles.widget}>
            <View>
                <Text style={geoStyles.text}>{"Yritykset tässä kätkössä: " + this.state.fails }</Text>
            </View>
            <View>
              <Text style={geoStyles.text}>{"Yrityksiä jäljellä: " + this.state.triesLeft}</Text>
            </View>
            <Timer style={geoStyles.text} secs={this.state.seconds} mins={this.state.minutes}/>
          </View>

        </View>
      </View>
    );

  }
}