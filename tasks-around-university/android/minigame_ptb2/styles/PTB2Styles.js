import Layout from '../../maingame/constants/Layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        //paddingTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row:{
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    redButton:{
        //borderWidth: 1,
        //borderColor: 'black',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        // borderRadius: 50?
        borderRadius: 100,
        margin: '3%',
        //underlayColor
    },
    blueButton:{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        borderRadius: 100,
        margin: '3%',
    },
    greenButton:{
        width: 100,
        height: 100,
        backgroundColor: 'limegreen',
        borderRadius: 100,
        margin: '3%',
    },
    yellowButton:{
        width: 100,
        height: 100,
        backgroundColor: 'gold',
        borderRadius: 100,
        margin: '3%',
    },
});

export default styles;
