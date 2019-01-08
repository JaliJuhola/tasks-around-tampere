import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import {Http} from '../core/connections/http';
import { Actions } from 'react-native-router-flux';
import {getSocketConnection} from '../common/minigame/Connection';
import { Headline } from 'react-native-paper';
import { Appbar, IconButton, Caption} from 'react-native-paper';
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
    justifyContent: 'space-around',
    flex: 1/5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  subHeading: {
    textAlign: 'center',
    marginTop: '5%',
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
    this.pusher = getSocketConnection();
    this.state = {
      answerStr: '',
      fails: 0,
      hintsUsed: 0,
      currentRiddle: "",
      current_score: 0,
      seconds: 0,
      minutes: 0,
      triesLeft: 6,
      groupId: 0,
      playerId: 0,
      playerName: 0,
      groupName: 0,
    };
    this.activate_channels_new_riddle = this.activate_channels_new_riddle.bind(this);
    this.sendQuess = this.sendQuess.bind(this);
    // Save the starting time of the game (used in scoring).
    this.startTime = new Date().getTime();
  }

  componentDidMount() {
      var self = this;
      Http.get('api/me').then(function (response) {
        self.setState(previousState => (
          {groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], groupName: response['data']['group']['name']}
          ));
      }).then(() => {
        self.activate_channels_new_riddle();
      });
      Http.get('api/geocache/',{answer: self.state.answerStr
      }).then(function (response) {
        self.setState({
          currentRiddle: response['data']['riddle'],
          groupId: response['data']['group_id']
        });
      })
  }

  activate_channels_new_riddle = () => {
    var that = this;
    var channel = that.pusher.subscribe('geocache-' + that.state.groupId);
    channel.bind('new-riddle', function(data) {
      const riddle = data['riddle'];
      const current_score = data['current_score'];
      const tries = data['tries'];
      if(current_score === that.state.currentScore) {
        if(tries >= 6) {
          alert("Arvauksesi loppuivat!");
          Actions.main_map();
        }
        if(!riddle) {
          alert("Peli loppui!");
          Actions.main_map();
        }
        that.setState(previousState => {
          return { triesLeft: 6-tries, fails: tries};
        });
      } else {
        that.setState(previousState => {
          return { currentRiddle: riddle, currentScore: current_score, fails: 6 - tries};
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
      if(!response['data']['status']) {
        self.setState({answerStr: ""});
      }
    });
  }
  render() {
    return (
      <View style={geoStyles.container}>
      		<Image
          source={require('../assets/images/tay.jpg')}
		  style={{justifyContent: 'center',position: 'absolute',top: 0,bottom: 0,zIndex: 0,height:'100%',width:'100%'}}
		  blurRadius={1}
        />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            Http.post('api/geocache/exit/',{
            })
          }}
          >
        </Appbar.BackAction>
        <Appbar.Content
          title={"Geocache"}
          />
      </Appbar.Header>
        <Headline style={geoStyles.subHeading}>Vihje</Headline>
        <View style={geoStyles.contents}>
          <View style={geoStyles.widget}>
            <Text style={geoStyles.text}>
              {this.state.currentRiddle}
            </Text>
            <View></View>
          </View>
          <Headline style={geoStyles.subHeading} >Arvauksesi</Headline>
          <View style={geoStyles.widget}>
            <View>
                <Text style={geoStyles.text}>{"Yritykset tässä kätkössä: " + this.state.fails }</Text>
            </View>
            <View>
              <Text style={geoStyles.text}>{"Yrityksiä jäljellä: " + this.state.triesLeft}</Text>
            </View>
            <Timer style={geoStyles.text} secs={this.state.seconds} mins={this.state.minutes}/>
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
        </View>
      </View>
    );

  }
}