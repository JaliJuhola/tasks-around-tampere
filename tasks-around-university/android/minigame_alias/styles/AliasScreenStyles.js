import Layout from '../../maingame/constants/Layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        paddingTop: '10%',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width: '90%',
        marginBottom: 20,
    },
    text:{
        alignItems: 'center',
        marginBottom: 20,
    },
    textCorrect:{
        justifyContent: 'center',
        marginBottom: 20,
    },
    textInput:{
        width: '90%',
        marginBottom: 20,
    },
    progressBar:{
        width: '90%',
        marginBottom: 20,
        color: "#2F4F4F"
    },
    debug:{
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default styles;
