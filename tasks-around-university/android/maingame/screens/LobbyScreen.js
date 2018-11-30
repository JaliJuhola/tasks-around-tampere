import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Appbar} from 'react-native-paper';
import Pusher from 'pusher-js/react-native';
import axios from "axios";
import {CommonData} from '../../common/CommonData'

/*Components*/
import Lobby, { LobbyCard} from '../components/Lobby';

/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';

const auth_socket = new Pusher("9aef7be7bb27baad1641", {
	cluster: "eu",
	forceTLS: true,
	authEndpoint: 'http://46.101.194.238:8080/pusher/auth',
	auth: {
	  user_id: CommonData.getPlayerId,
    headers: {
      'Authorization': "ac07583a-f0b1-11e8-9826-7e21ba590deb"
    }
  }
});
var channel = auth_socket.subscribe('presence-lobby-channel');
channel.bind('pusher:subscription_succeeded', function(members) {
	//$('#lobby').empty()

	members.each(function(member) {
			//this.member_add(member.id);
			console.log("Count123456732423432423423423423432432423432423 ASDSAD", members.count )
			
	})
	console.log("Count", members.count)
})
export default class LobbyScreen extends React.Component {

	
	members = () => {
	/*Replace this with a connect to server and fetch JSON*/
	let list = JSON.parse('{"members1":[{"id":0,"name":"Fuksi 777","role":"You","joined":true,"icon":"space-shuttle"},{"id":1,"name":"Koodikoira ","role":"Käpistelijäryhmä","joined":true,"icon":"connectdevelop"},{"id":2,"name":"Sakari ","role":"Käpistelijäryhmä","joined":true,"icon":"soccer-ball-o"},{"id":3,"name":"Jokuvaa ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"},{"id":4,"name":"TestName ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"}]}');
	let key = 0;

	return list.members1.map((item) => {
		return (<LobbyCard key={item.id} name={item.name} role={item.role} joined={item.joined} icon={item.icon}/>);
	});
	
	console.log("Countaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" )
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