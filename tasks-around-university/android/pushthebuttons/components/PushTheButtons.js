import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
// import {MiniGameScore} from '../../common/minigame/Score';
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';
import {getSocketConnection} from '../../common/minigame/Connection';
<<<<<<< HEAD
import {Loading} from '../../common/Components/Loading';
import {Appbar, Subheading, Divider} from 'react-native-paper';
import { MainView } from '../../common/Components/MainView';
=======
import {Appbar, Subheading, Divider} from 'react-native-paper';
import { MainView } from '../../common/Components/MainView';
import {GameContainer} from '../../common/Components/GameContainer';
import TimerCountdown from 'react-native-timer-countdown';
import { InfoContainer } from '../../common/Components/InfoContainer';
>>>>>>> development

export default class PushTheButtonsScreen extends React.Component {
  constructor(props) {
    super(props);
    // Common data should be abstracted later
    this.pusher = getSocketConnection();

    this.state = {
      playerToClickMessage: "Peli alkaa kuin joku painaa napista",
      secondsToPush: 0,
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
      const time_to_push = data['seconds_to_push'];
        that.setState(previousState => {
          return { secondsToPush: time_to_push / 1000};
          });
      if(that.state.playerId === data['player_who_has_event']) {

        that.setState(previousState => {
          return { playerToClickMessage: data['target_player'], clickable:true};
        });
      } else {
        that.setState(previousState => {
          return { playerToClickMessage: undefined};
        });
      }

    });
    return channel;
  }
  activate_channels_push_completed = () => {
    var that = this;
    var channel = this.pusher.subscribe('push-the-buttons-' + that.state.groupId);
    channel.bind('push-completed', function(data) {
      if(!data['player_id']){
        Alert.alert("Push The Buttons", "Peli loppui pistein " + data['current_score']);
        that.setState(previousState => {
          return { playerToClickMessage: 0};
        });
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
    self.setState(previousState => {
      return { playerToClickMessage: undefined, clickable:false };
    });
    Http.patch('api/push_the_buttons',{group_id: self.state.groupId
    }).then(function (response) {
    }).catch(function (error) {
      console.log(error);
      console.log(error.status);
    })
  }
  render() {
    var that = this;
<<<<<<< HEAD
    return (
        <MainView mainText="Push the buttons" onExit= {() => {Actions.main_map();}}>
        <View style={styles.container}>
          <Text style={styles.textItems}>{"Numerosi: " + that.state.playerId}</Text>
=======
    var targetedStr = undefined;
    if(this.state.playerToClickMessage === "Peli alkaa kuin joku painaa napista") {
      targetedStr = <View style={{flexDirection: 'row', }}>
      <Text style={styles.textItemsBold}>{this.state.playerToClickMessage}</Text>
    </View>
    } else if(this.state.playerToClickMessage) {
      targetedStr = <View style={{flexDirection: 'row' , flexWrap: 'wrap'}}>
      <Text style={styles.textItems}>Numero  </Text>
      <Text style={styles.textItemsBold}>{that.state.playerToClickMessage}</Text>
      <Text style={styles.textItems}> klikkaa nappia</Text>
    </View>
    } else {
      targetedStr = <View style={{flexDirection: 'row', }}>
      <Text style={styles.textItemsBold}>Odota komentoa!</Text>
    </View>
    }
    return (
        <MainView mainTitle="Push the buttons" onExit= {() => {Actions.main_map();}}>
        <GameContainer style={styles.container}>
        <View style={{flexDirection: 'row', }}>
            <Text style={styles.textItems}>Numerosi: </Text>
            <Text style={styles.textItemsBold}>{that.state.playerId}</Text>
        </View>
>>>>>>> development
          <Divider />
          <View style={{flexDirection: 'row', }}>
            <Text style={styles.textItems}>Pisteet:  </Text>
            <Text style={styles.textItemsBold}>{that.state.currentScore}</Text>
          </View>
          <Divider />
          <View style={{flexDirection: 'row', }}>
            <Text style={styles.textItems}>Aikaa painaa nappia: </Text><TimerCountdown
              initialSecondsRemaining={1000*this.state.secondsToPush}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={() => console.log('complete')}
              style={styles.textItemsBold}
            />
          </View>
          <Divider />
          {targetedStr}
          <Divider />
          <Button
            onPress={() => this.playerClickedButton()}
            title="Paina tätä nappia kuin joku niin sanoo!"
            style={styles.mainButton}
          />
<<<<<<< HEAD
        </View>
=======
        </GameContainer>
        <InfoContainer style={styles.container}>
        <Text style={styles.textItemsInfo}>
          Tässä pelissä yksi pelaajista saa käskyn, jonka mukaan jonkin muun pelaajan tulee painaa nappia. Muista oma numerosi, koska käsky tulee sen mukaan.
        </Text>
        </InfoContainer>
>>>>>>> development
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  textItemsBold: {
    marginTop: 20,
    paddingBottom: 15,
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold'
  },
  textItemsInfo: {
    marginTop: 20,
    paddingBottom: 15,
    fontSize: 22,
    color: '#31708f'
  },
  textItems: {
    marginTop: 20,
    paddingBottom: 15,
    fontSize: 22,
    color: "white"
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
