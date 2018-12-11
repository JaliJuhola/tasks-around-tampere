import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Appbar} from 'react-native-paper';
import {CommonData} from '../../common/CommonData';
/*Components*/
import Lobby, { LobbyCard} from '../components/Lobby';
import {Http} from '../../core/connections/http';
/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';
import { AsyncStorage } from "react-native";


export default class LobbyScreen extends React.Component {
	async componentDidMount() {
		var self = this;
		Http.get('api/me').then(function (response) {
			console.log(response);
			self.setState(previousState => (
				{groupId: response['data']['group']['id'], playerId: response['data']['player']['id'], playerName: response['data']['player']['name'], gropName: response['data']['group']['name']}
			));
			}).then(() => {
				this.members()
		});
  }
	members = () => {
	/*Replace this with a connect to server and fetch JSON*/
	var self = this;
	var pictures = ["space-shuttle","connectdevelop","soccer-ball-o"]
	var image_index = 0
	var members = 0

	Http.get('api/group/player').then(function (response) {
		var list = [];
		return response['data'].map((item) => {
			image_index = image_index + 1;
			members = members + 1;
			if(image_index === 3) {
				image_index = 0
			}
			if(item.id === this.state.playerId) {
				return (<LobbyCard key={item.id} name={item.name} role={"You"} joined={true} icon={pictures[image_index]}/>);
			}
			if(members < 4) {
				 var role = this.state.groupName;
				 return (<LobbyCard key={item.id} name={item.name} role={role} joined={true} icon={pictures[image_index]}/>);
			}
		});
	}).then(function (response) {
		console.log(response)
		self.setState(previousState => (
			{ cards: response}
		));
	})
  }

  state = {
		gamename: 'Testipeli',
		playercount: 3,
		groupsize: 4,
		playerId: undefined,
		groupId: undefined,
		groupName: undefined,
		playerName: undefined,
		cards: [<LobbyCard key={0} name={"No items fetched"} role={"You"} joined={true} icon={"soccer-ball-o"}/>]
  };

  _onNavigation = () => console.log("Navigation");

  render() {
    return (
      <View style={LobbyScreenStyles.container}>
        <Appbar.Header style={LobbyScreenStyles.appbar}>
			<Appbar.Action
				icon="menu"
				onPress={this._onNavigation}
			/>
			<Appbar.Content
			  title={this.state.groupname}
			/>
		</Appbar.Header>
        <ScrollView contentContainerStyle={LobbyScreenStyles.scrollView}>
			{this.state.cards}
		</ScrollView>
      </View>
	)
  }
}