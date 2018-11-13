import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Appbar} from 'react-native-paper';

/*Components*/
import Lobby, { LobbyCard} from '../components/Lobby';

/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';



export default class LobbyScreen extends React.Component {
	members = () => {
	/*Replace this with a connect to server and fetch JSON*/
	let list = JSON.parse('{"members":[{"id":0,"name":"Fuksi 777","role":"You","joined":true,"icon":"space-shuttle"},{"id":1,"name":"Koodikoira ","role":"Käpistelijäryhmä","joined":true,"icon":"connectdevelop"},{"id":2,"name":"Sakari ","role":"Käpistelijäryhmä","joined":true,"icon":"soccer-ball-o"},{"id":3,"name":"Jokuvaa ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"},{"id":4,"name":"TestName ","role":"Käpistelijäryhmä","joined":true,"icon":"space-shuttle"}]}');
	let key = 0;
	
	return list.members.map((item) => {
		return (<LobbyCard key={item.id} name={item.name} role={item.role} joined={item.joined} icon={item.icon}/>);
	});
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
}