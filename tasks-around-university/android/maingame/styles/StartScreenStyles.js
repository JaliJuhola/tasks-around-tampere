import Layout from '../constants/Layout';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 20,
  },
  iconWrap: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 4,
    minWidth: 40,
  },
  inputIcon: {
    color: 'lightgrey',
  },
  textInput: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: "white",
    borderTopLeftRadius: 0,
  },
  smallText: {
    width: '90%',
    textAlign: 'left',
    fontSize: 12,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 0,
    height:'100%',
    width:'100%'
  },
  button: {
    backgroundColor: 'lightgrey',
    width: '90%',
    paddingVertical: 10,
    marginVertical: 10,
  },
  firstButton: {
    marginTop: 50,
  },
  violetButton: {
    backgroundColor: '#6200ee',
  },
  logo: {
    backgroundColor: 'rgba(256, 256, 256, 0.5)',
    borderRadius: 100,
    height: 200,
    width: 200,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
  },
  
  });

export default styles;