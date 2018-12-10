import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {CommonData} from '../../common/CommonData';
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
// import {MiniGameScore} from '../../common/minigame/Score';
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';
import {getSocketConnection} from '../../common/minigame/Connection';

// import Connection from '../../../android/common/minigame/Connection';
// import {MiniGameScore} from '../../../android/common/minigame/Score';

const SCORE_TO_ADD = 1;
const MINIGAME_KEY = 'push_the_buttons';
export default class PushTheButtonsScreen extends React.Component {
  constructor(props) {
    super(props);
    // Common data should be abstracted later
    this.playerId = CommonData.getPlayerId();
    this.groupId = CommonData.getGroupId();
    this.groupName = CommonData.getGroupName();
    this.playerName = CommonData.getPlayerName();
    this.pusher = getSocketConnection()
    // this.scoreHelper = new MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

    this.state = {
      playerToClickMessage: "Player 3 should click the button!",
      joinGroupModalVisible: false,
      currentScore: 0,
    };
  }

  render() {
    var playerFailed = () => {
        alert("You lost");
        Actions.main_home()
    }
    var playerSucceed = () => {
        alert("n1");
    }
    var playerClickedButton = () => {
      if (this.state.playerToClickMessage != null) {
        Http.patch('api/push_the_buttons/',{group_id: this.groupId
        })
          .then(function (response) {
            console.log(response);
            this.setState(previousState => {
              return { playerToClickMessage: null };
          });
          })
          .catch(function (error) {
            playerFailed()
          })
      } else {
        alert("Wait for signal!");
      }
    }

    var activate_channels = () => {
        var channel = this.pusher.subscribe('push-the-buttons-' + this.group_id);

        channel.bind('push-completed', function(data) {
          console.log(data);
          this.setState(previousState => {
            return { currentScore: data['current_score']};
          });
        });
        channel.bind('new-push', function(data) {
          console.log(data);
          this.setState(previousState => {
            return { currentScore: data['current_score'] };
          });
        });
        return channel;

    }
    //"push-the-buttons-{group_id}" event: push-completed

//{'target_player': target_player, 'player_who_has_event': player_who_has_event}

//"{push-the-buttons}-{group_id}" push-completed

//{'player_id': player_who_pushed}

    activate_channels();
    return (
      <View style={styles.container}>
        <Text>You are player 1</Text>
        <Text>Current Score {this.state.currentScore}</Text>
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
