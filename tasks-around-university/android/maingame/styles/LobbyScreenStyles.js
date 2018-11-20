import Layout from '../constants/Layout';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container:{
	flex:1,
  },
  scrollView:{
	alignItems: 'center',
	paddingTop: 10,
  },
  lobbyCard:{
	width: '90%',
	backgroundColor: '#FFFFFF',
	elevation: 3,
	borderRadius: 5,
	padding: 20,
	marginBottom: 20,
  },
  lobbyCardGrey:{
	color: 'grey',
  },
  lobbyCardHeadline:{
	marginTop: 5,
	marginBottom: 15,
  },
  lobbyCardWaitingIconWrap:{
	flexDirection: 'row',
  },
  lobbyCardWaitingIcon:{
	marginRight: 10,
	color: 'grey',
  },
  lobbyCardIcon:{
	backgroundColor: 'grey',
	padding: 10,
	position:'absolute',
	right:20,
	top:20,
	borderRadius:100,
	height: 60,
	width: 60,
	alignItems: 'center',
	justifyContent: 'center',
  },

  lobbyCardJoined:{

  },
  lobbyCardWaiting:{
	backgroundColor: 'darkgrey',
  },
});

export default styles;