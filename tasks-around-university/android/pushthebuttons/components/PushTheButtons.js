import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {GlobalStorage} from '../../core/store/store';
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
    this.playerId = undefined;
    this.groupId = undefined;
    this.groupName = undefined;
    this.playerName = undefined;
    this.pusher = getSocketConnection();
    // this.scoreHelper = new MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

    this.state = {
      playerToClickMessage: "Player 3 should click the button!",
      joinGroupModalVisible: false,
      currentScore: 0,
    };
  }
  async componentDidMount() {
    console.log("Component did mount")
    GlobalStorage.getItem("player_id").then(function (response) {
      console.log(response)
      this.playerId = response;
    });
    GlobalStorage.getItem("group_id").then(function (response) {
      this.groupId = response;
    });
    GlobalStorage.getItem("group_name").then(function (response) {
      this.groupName = response;
    });
    GlobalStorage.getItem("player_name").then(function (response) {
      this.playerName = response;
    });
  }

  render() {
    var that = this;
    if(!that.playerId || !that.groupId) {
      return  (<Text>Loading....</Text>)
    }
    var playerClickedButton = () => {
      if (this.state.playerToClickMessage != null) {
        Http.patch('api/push_the_buttons',{group_id: this.groupId
        }).then(function (response) {
            that.setState(previousState => {
              return { playerToClickMessage: null };
              });

        })
        .catch(function (error) {
          console.log(error);
          playerFailed()
        })
      } else {
        alert("Wait for signal!");
      }
    }

    var activate_channels = () => {
        var channel = this.pusher.subscribe('push-the-buttons-' + that.groupId);
        console.log('push-the-buttons-' + that.groupId)
        channel.bind('push-completed', function(data) {
          console.log(data);
          that.setState(previousState => {
            return { currentScore: data['current_score']};
          });
        });
        channel.bind('new-push', function(data) {
          console.log(data);
          that.setState(previousState => {
            return { currentScore: data['current_score'] };
          });
        });
        return channel;

    }
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
