import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Button,
} from 'react-native';
    // Enable pusher logging - don't include this in production
import Pusher from 'pusher-js/react-native';
import { Actions } from 'react-native-router-flux';
export default class PushTheButtonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerToClickMessage: "Player 3 should click the button!",
      joinGroupModalVisible: false,
      player_id: 1,
    };
  }

  render() {
    playerFailed = () => {
        alert("You lost")
        Actions.main_home()
    }
    playerSucceed = () => {
        alert("n1")
    }
    playerClickedButton = () => {
      if (this.state.playerToClickMessage != null) {
        axios.patch('http://localhost:8000/push_the_buttons/button_clicked', {
            params: {
              id: 1, // My player id
              group_id: 1 // My group id
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            playerFailed()
          })
          .then(function () {
            this.setState(previousState => {
                return { playerToClickMessage: null };
            });
          });
      } else {
        alert("Wait for signal!")
      }
    }
    activate_channels = () => {
      Pusher.logToConsole = true;
      var pusher = new Pusher('9001161e48db4e48e5f0', {
        cluster: 'eu',
        forceTLS: true
      });
      var channel = pusher.subscribe('my-channel');
      channel.bind('new_push', function(data) {
        if(data.player_id === this.state.player_id) {
            this.setState(previousState => {
                return { playerToClickMessage: str(data.target_player) + " Should push the button!" };
            });
        } else {
            this.setState(previousState => {
                return { playerToClickMessage: "New push action!" };
            });
        }
      });
    }
    activate_channels()
    return (
      <View style={styles.container}>
        <Text>You are player 1</Text>
        <Text>{this.state.playerToClickMessage || "Wait for new command!"}</Text>
        <Button
          onPress={playerClickedButton}
          title="Click here when someones says so!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
