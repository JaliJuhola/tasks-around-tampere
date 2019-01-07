import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    questionContainer: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        left: 0,
        right: 0,
        top: 0,
        height: 200,
        padding: 20,
        borderColor: '#6200ee',
        borderWidth: 5,
      },
    questionText: {
        marginTop: 30,
        alignSelf: 'center',
        fontSize: 18,
      },
    answerTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    answerText: {
        color: 'white',
        alignSelf:'center',
        backgroundColor: '#6200ee',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 16,
        borderRadius: 5,
    },
    answerButton: {
        height: 100,
        width: '45%',
        alignContent:'center',
        justifyContent: 'flex-end'
    },
    modalWindowContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalWindow: {
        backgroundColor: "#FFFFFF",
        width: '75%',
        height: '75%',
        borderWidth: 5,
        borderColor: '#6200ee',
    },
    modalPlaceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200ee',
        width: '100%',
        height: '10%',
    },
    modalPlace: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    modalDescription: {
        alignSelf: 'center',
        width: '100%',
        height: '40%',
        borderTopWidth: 3,
        borderColor: '#6200ee',
    },
    modalTextContainer: {
        alignSelf: 'center',
        marginTop: 5,
        width: '80%',
        height: '30%',
    },
    modalText: {
        marginTop: 7,
        alignSelf: 'center',
        fontSize: 16,
    },
    modalButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    modalButton: {
        backgroundColor: '#6200ee',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 20,
    },
    bottomScreen: {
        backgroundColor: '#6200ee',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomScreenText: {
        color: 'white',
        fontSize: 20
    },
    userNameContainer: {
        width: 200,
        flex: 1,
        alignItems: 'center',
    },
    userName: {
        color: 'white',
        backgroundColor: '#6200ee',
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    userMarkerImage: {
        width: 50,
        height: 50,
    }

});

export default styles;