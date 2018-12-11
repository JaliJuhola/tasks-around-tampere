import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Appbar} from 'react-native-paper';
import Pusher from 'pusher-js/react-native';
import axios from "axios";
import {CommonData} from '../../common/CommonData'
import {Http} from '../../core/connections/http';

/*Components*/
import Lobby, { LobbyCard} from '../components/Lobby';

/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';

export default class LobbyScreen extends React.Component {


	async members() {
	var icons = ["soccer-ball-o", "space-shuttle", "connectdevelop"];
	var current_icon = 0;

	let list = JSON.parse('{"members1":[{"id":0,"name":"Fuksi 777","role":"You","joined":true,"icon":"space-shuttle"},{"id":1,"name":"Koodikoira ","role":"Käpistelijäryhmä","joined":true,"icon":"connectdevelop"},{"id":2,"name":"Sakari ","role":"Käpistelijäryhmä","joined":true,"icon":"soccer-ball-o"},{"id":3,"name":"Jokuvaa ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"},{"id":4,"name":"TestName ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"}]}');
	return await Http.get('api/group/player').then(function (response) {
		console.log(response);
		return list.members1.map((item) => {
			return (<LobbyCard key={item.id} name={item.name} role={item.role} joined={item.joined} icon={item.icon}/>);
		});
	})

	}


  state = {
    username: 'Testikäyttäjä',
    groupname: "Testiryhmä",
	gamename: 'Testipeli',
	playercount: 3,
	groupsize: 4,
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
			{this.members()}
		</ScrollView>
      </View>
	)
	}
	add_member(member) {
		var list = JSON.parse('{"members1":[{"id":5,"name":"Fuksi 777","role":"You","joined":true,"icon":"space-shuttle"}')
		console.log("USER ADDED WITH ID --------" + member.id)
	}
}