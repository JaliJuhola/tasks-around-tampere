import React from 'react';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
import { Appbar, Button, IconButton, Caption} from 'react-native-paper';
/*Components*/
import Lobby, { LobbyCard} from '../components/Lobby';
import {Http} from '../../core/connections/http';
/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';
import MiniGameEntry from '../../common/minigame/Entry';
import { Actions } from 'react-native-router-flux';
import {StartScreenStyles} from '../styles/StartScreenStyles';
export default class LobbyScreen extends React.Component {
	componentDidMount() {
		this.target_action = this.props.target_str;
		this.lobby_id = this.props.lobby_id;
		this.callcount = 0;
		var self = this;
		this.interval = undefined;
		Http.get('api/me').then(function (response) {
			self.setState(previousState => (
				{groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], groupName: response['data']['group']['name'], isLeader: response['data']['player']['leader']}
			));
			return response;
			}).then((response) => {
				this.members(response['data']['player']['id'], response['data']['group']['name'], true);
				this.interval = setInterval(() => {
						this.members(response['data']['player']['id'], response['data']['group']['name'], false);
				}, 5000);
			});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	members(player_id, group_name, first_load) {
		/*Replace this with a connect to server and fetch JSON*/
		var self = this;
		var pictures = ["space-shuttle","connectdevelop","soccer-ball-o"]
		var image_index = 0
		var members = 0

		Http.patch('api/lobby',{lobby_id: this.lobby_id}).then(function (response) {
			if(response['data']['closed']) {
				return MiniGameEntry.enter_minigame(this.target_action);
			}
			return response['data']['players'].map((item) => {
				image_index = image_index + 1;
				members = members + 1;
				if(image_index === 3) {
					image_index = 0
				}
				if(item.id === player_id) {
					return (<LobbyCard key={item.id} name={item.name} role={"You"} joined={true} icon={item.avatar}/>);
				}
				if(members < 8) {
					var role = group_name;
					return (<LobbyCard key={item.id} name={item.name} role={role} joined={true} icon={item.avatar}/>);
				}
			});
		}).then(function (response) {
			if(!first_load){
				self.setState(previousState => (
					{ cards: response, loadingColor: "#28a745"}
				));
			} else {
				self.setState(previousState => (
					{ cards: response}
				));
			}
		});
	}

  state = {
		gamename: 'Testipeli',
		playercount: 3,
		loadingColor: "#17a2b8",
		groupsize: 4,
		playerId: undefined,
		groupId: 0,
		groupName: "",
		playerName: "",
		cards: [<LobbyCard key={0} name={"Pelaajia ei ole haettu"} role={"You"} joined={true}/>]
  };

  _onNavigation = () => console.log("Navigation");

  render() {
		var toTarget = () => {
			Http.patch('api/lobby/close',{lobby_id: this.lobby_id}).then(function (response) {
				return MiniGameEntry.enter_minigame(this.target_action);
			})
		}
		let warningMessage = '';
		let buttonColor = '';
		let buttonPress = undefined;
		let buttonOpacity = 1;
		if (this.state.cards.length < 1) {
			buttonColor = "#ff0033";
			buttonPress = undefined;
			buttonOpacity = 0.5;
			warningMessage = <Caption  style={{flexDirection: "row", marginBottom: "5%", fontSize: 20, textAlign: "center", color: "#ff0033", elevation: 4}} height={40}>Pelissä tulee olla vähintään 2 pelaajaa</Caption>;
		} else {
			warningMessage = <Caption></Caption>
			buttonColor = "#00FF00"
			buttonPress = toTarget;
			buttonOpacity = 1;
		}

    return (
      <View style={LobbyScreenStyles.container}>
		<Image
          source={require('../../assets/images/tay.jpg')}
		  style={{    justifyContent: 'center',position: 'absolute',top: 0,bottom: 0,zIndex: 0,height:'100%',width:'100%'}}
		  blurRadius={1}
        />
        <Appbar.Header style={LobbyScreenStyles.appbar}>
			<Appbar.BackAction
				onPress={() => Actions.main_map()}
			>
			</Appbar.BackAction>
			<Appbar.Content
			  title={this.state.groupName + "(" + this.state.groupId + ")" }
			  subtitle="Aula"
			  subtitleStyle={{marginTop: -5, opacity: 1}}
			/>
		</Appbar.Header>
		<View style={{flexDirection: "row"}}>
			<IconButton
				icon="update"
				color={this.state.loadingColor}
				onPress={() => {
					this.setState(previousState => (
						{loadingColor: "#ffc107", cards: []}
					));
					this.members(this.state.playerId, this.state.groupName, false)
				}}
				style={{elevation: 3}}
			/>
		</View>
			<ScrollView contentContainerStyle={LobbyScreenStyles.scrollView} height="92%">
				{this.state.cards}
			</ScrollView>
			{warningMessage}
			<View style={{flexDirection: "row", marginBottom: "5%"}} height="8%">
				<Button mode="contained" onPress={buttonPress} color={buttonColor} style={{marginLeft: "20%", width: "60%", elevation: 1, opacity: buttonOpacity}}>Aloita
				</Button>
			</View>
      </View>
	)
  }
}
