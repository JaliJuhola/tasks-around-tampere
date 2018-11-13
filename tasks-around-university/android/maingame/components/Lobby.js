import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Surface, Headline } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

/*Stylesheets*/
import LobbyScreenStyles from '../styles/LobbyScreenStyles';



export default class Lobby extends React.Component {
	
  render() {
    return null;
  }
}

export class LobbyCard extends React.Component {
	
	state = {
		id : this.props.id,
		name : this.props.name,
		role : this.props.role,
		joined : this.props.joined,
		icon : this.props.icon,
	}
	
	render() {
		return (
		  <Surface style={[LobbyScreenStyles.lobbyCard, this.state.joined ? LobbyScreenStyles.lobbyCardJoined : LobbyScreenStyles.lobbyCardWaiting,]} >
			<Text style={LobbyScreenStyles.lobbyCardGrey}>{this.state.role}</Text>
			<Headline style={LobbyScreenStyles.lobbyCardHeadline}>{this.state.name}</Headline>
			<View style={LobbyScreenStyles.lobbyCardWaitingIconWrap}>
				<Icon name={this.state.joined ? "heart" : "heart-o"} size={20} style={LobbyScreenStyles.lobbyCardWaitingIcon}/>
				<Text style={LobbyScreenStyles.lobbyCardGrey}>{this.state.joined ? "Joined" : "Waiting"}</Text>
			</View>
			<View style={LobbyScreenStyles.lobbyCardIcon}><Icon name={this.state.icon} size={24} /></View>
		  </Surface>
		);
	}
}