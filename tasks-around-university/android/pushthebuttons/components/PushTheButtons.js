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
    this.pusher = getSocketConnection();
    // this.scoreHelper = new MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

    this.state = {
      playerToClickMessage: "Player 3 should click the button!",
      joinGroupModalVisible: false,
      currentScore: 0,
      playerId: undefined,
      groupId: undefined,
      groupName: undefined,
      playerName: undefined
    };
  }
  async componentDidMount() {
    var self = this;
    Http.get('api/me').then(function (response) {
			console.log(response);
			self.setState(previousState => (
				{groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], groupName: response['data']['group']['name']}
        ));
      }).then(() => {
        this.activate_channels()
      });
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
  activate_channels = () => {
    var that = this;
    var channel = this.pusher.subscribe('push-the-buttons-' + that.state.groupId);
    channel.bind('push-completed', function(data) {
      console.log(data);
      console.log("*****************************************");
      if(!data['player_id']){
        alert("game ended with score " + data['current_score'])
        Actions.pop()
      }
      that.setState(previousState => {
        return { currentScore: data['current_score']};
      });
    });
    var self = this;
    channel.bind('new-push', function(data) {
      console.log(data);
      console.log("*****************************************");
      var target_str = data['player_who_has_event'] + " should click the button";
      console.log(target_str);
      self.setState(previousState => {
        return {playerToClickMessage: target_str};
      });
    });
    return channel;

}
  render() {
    var that = this;
    var playerClickedButton = () => {
      if (this.state.playerToClickMessage != null) {
        Http.patch('api/push_the_buttons',{group_id: this.state.groupId
        }).then(function (response) {
            that.setState(previousState => {
              return { playerToClickMessage: null };
            });
        })
        .catch(function (error) {
          console.log(error);
          Actions.pop()
        })
      } else {
        alert("Wait for signal!");
      }
    }
    if(!that.state.playerId || !that.state.groupId) {
      return  (<Text>Loading....</Text>)
    }
    return (
      <View style={styles.container}>
        <Text>You are player {this.state.playerId}</Text>
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
