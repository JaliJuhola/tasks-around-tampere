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
import {MiniGameScore} from '../../common/minigame/Score';
    // Enable pusher logging - don't include this in production
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';

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
    this.scoreHelper = MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

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
        Http.patch('push_the_buttons/button_clicked',{id: this.playerId, group_id: this.groupId
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
      // Listens score
      var setScore = function(value) {
        this.setState(previousState => {
          return { currentScore: value };
        });
      }
      this.scoreHelper.broadcastScore(setScore);
      // listens new click actions
      var setNewClickAction = function(value) {
        this.setState(previousState => {
          return { playerToClickMessage: value };
        });
      }
        var channel = this.pusher.subscribe('actions-' + this.group_id);

        channel.bind('score_updated', function(data) {
          if(data.method === "new") {
            setNewClickAction(data)
          }
        });
        return channel;
    }
    activate_channels();
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
