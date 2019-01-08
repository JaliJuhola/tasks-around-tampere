import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
// import {MiniGameScore} from '../../common/minigame/Score';
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';
import {getSocketConnection} from '../../common/minigame/Connection';

export default class PushTheButtonsScreen extends React.Component {
  constructor(props) {
    super(props);
    // Common data should be abstracted later
    this.pusher = getSocketConnection();
    // this.scoreHelper = new MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

    this.state = {
      playerToClickMessage: "Peli alkaa kuin joku pelaaja painaa tästä!",
      secondsToPush: 999999,
      joinGroupModalVisible: false,
      currentScore: 0,
      playerId: undefined,
      groupId: undefined,
      groupName: undefined,
      playerName: undefined
    };
    this.playerClickedButton = this.playerClickedButton.bind(this);
    this.activate_channels_push_completed = this.activate_channels_push_completed.bind(this);
    this.active_channels_new_push = this.active_channels_new_push.bind(this);

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
      const time_to_push = data['seconds_to_push'];
      if(that.state.playerId === data['player_who_has_event']) {
        that.setState(previousState => {
          return { secondsToPush: time_to_push / 1000};
          });
      }
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
        return Actions.main_map()
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
      self.setState(previousState => {
        return { playerToClickMessage: "Wait for new command!" };
      });
      Http.patch('api/push_the_buttons',{group_id: self.state.groupId
      }).then(function (response) {
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
        <Text>Olet pelaaja numero{that.state.playerId}</Text>
        <Text>Tämän hetkiset pisteet{that.state.currentScore}</Text>
        <Text>Aikaa painaa nappia{that.state.secondsToPush}</Text>
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
