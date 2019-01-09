import Layout from '../../maingame/constants/Layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        //paddingTop: '10%',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: '5%',
    },
    text:{
        paddingTop: 40,
        paddingLeft: 30,
    },
    coloredButton:{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        // borderRadius: 50?
        borderRadius: 100,
        margin: '3%',
        alignItems: 'center',
    },
});

export default styles;
