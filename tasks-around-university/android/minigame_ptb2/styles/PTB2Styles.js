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
    coloredButton:{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        // borderRadius: 50?
        borderRadius: 100,
        margin: '3%',
    },
});

export default styles;
