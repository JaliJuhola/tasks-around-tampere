import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
// import {MiniGameScore} from '../../common/minigame/Score';
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';
import {getSocketConnection} from '../../common/minigame/Connection';
import {Loading} from '../../maingame/components/Loading';
import {Appbar, Subheading, Divider} from 'react-native-paper';

export default class PushTheButtonsScreen extends React.Component {
  constructor(props) {
    super(props);
    // Common data should be abstracted later
    this.pusher = getSocketConnection();

    this.state = {
      playerToClickMessage: "Peli alkaa kuin joku pelaaja painaa napista!",
      secondsToPush: 999999,
      joinGroupModalVisible: false,
      currentScore: 0,
      playerId: undefined,
      groupId: undefined,
      groupName: undefined,
      playerName: undefined,
      clickable: true,
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
      const target_str = "Pelaajan numero " + data['player_who_has_event'] + " Tulee klikata";
      const time_to_push = data['seconds_to_push'];
      if(that.state.playerId === data['player_who_has_event']) {
        that.setState(previousState => {
          return { secondsToPush: time_to_push / 1000};
          });
      }
      that.setState(previousState => {
      return { playerToClickMessage: target_str, clickable:true};
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
        return { playerToClickMessage: "Wait for new command!", clickable:false };
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
      return  (<Loading message="Odotetaan pelin latautumista!"></Loading>)
    }
    return (
      <View style={styles.mainContainer}>
        <Image
          source={require('../../assets/images/tay.jpg')}
		    style={{justifyContent: 'center',position: 'absolute',top: 0,bottom: 0,zIndex: 0,height:'100%',width:'100%'}}
		      blurRadius={2}
        />
        <Appbar.Header>
			  <Appbar.BackAction
				onPress={() => Actions.main_map()}
			  >
			  </Appbar.BackAction>
			  <Appbar.Content
			  title={this.state.groupName + "(" + this.state.groupId + ")" }
			  subtitle="Push the buttons"
			  subtitleStyle={{marginTop: -5, opacity: 1}}
			  />
		    </Appbar.Header>
        <View style={styles.container}>
          <Text style={styles.textItems}>{"Numerosi: " + that.state.playerId}</Text>
          <Divider />
          <Text style={styles.textItems}>{"Pisteet: " + that.state.currentScore}</Text>
          <Divider />
          <Text style={styles.textItems}>{"Aikaa: " + that.state.secondsToPush}</Text>
          <Divider />
          <Text style={styles.textItems}>{that.state.playerToClickMessage}</Text>
          <Divider />
          <Button
            onPress={() => this.playerClickedButton()}
            title="Paina tätä nappia kuin joku niin sanoo!"
            style={styles.mainButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  textItems: {
    marginTop: 20,
    paddingBottom: 15,
    fontSize: 26,
    color: "#000099"
  },
  mainButton: {
    marginTop: 40,
    fontSize: 20,
    color:'#4e008e'
  },
  mainContainer: {
    height: "100%",
    width: "100%",
  }
});
