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
    this.playerClickedButton = this.playerClickedButton.bind(this)
  }
  async componentDidMount() {
    var self = this;
    Http.get('api/me').then(function (response) {
			self.setState(previousState => (
				{groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], groupName: response['data']['group']['name']}
        ));
      }).then(() => {
        this.active_channels_new_push()
        this.activate_channels_push_completed()
      });
      Http.get('api/me').then(function (response) {
        console.log(response);
        self.setState(previousState => (
          {groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], groupName: response['data']['group']['name']}
        ));
        return response;
        }).then((response) => {
          this.members(response['data']['player']['id'], response['data']['group']['name']);
          // Fetching group member once in every 8 seconds
      });
  }
  active_channels_new_push = () => {
    var that = this;
    var channel = this.pusher.subscribe('push-the-buttons-' + that.state.groupId);
    channel.bind('new-push', function(data) {
      const target_str = data['player_who_has_event'] + " should click the button";
      that.setState(previousState => {
      return { playerToClickMessage: target_str};
      });
    });
    return channel;
  }
  activate_channels_push_completed = () => {
    var that = this;
    var channel = this.pusher.subscribe('push-the-buttons-' + that.state.groupId);
    channel.bind('push-completed', function(data) {
      if(!data['player_id']){
        alert("game ended with score " + data['current_score']);
        return Actions.pop()
      }
      that.setState(previousState => {
        return { currentScore: data['current_score']};
      });
    });
    return channel;

  }
  playerClickedButton = () => {
    var self = this;
    if (this.state.playerToClickMessage !== "Wait for new command!") {
      Http.patch('api/push_the_buttons',{group_id: self.state.groupId
      }).then(function (response) {
          self.setState(previousState => {
            return { playerToClickMessage: "Wait for new command!" };
          });
      }).catch(function (error) {
        console.log(error);
        console.log(error.status);
      })
    } else {
      alert("Wait for signal!");
    }
  }
  render() {
    var that = this;
    if(!that.state.playerId || !that.state.groupId) {
      return  (<Text>Loading....</Text>)
    }
    return (
      <View style={styles.container}>
        <Text>You are player {that.state.playerId}</Text>
        <Text>Current Score {that.state.currentScore}</Text>
        <Text>{that.state.playerToClickMessage}</Text>
        <Button
          onPress={() => this.playerClickedButton()}
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
