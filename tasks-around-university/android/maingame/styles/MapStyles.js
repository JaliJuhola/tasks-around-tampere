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
        justifyContent: 'center',
    },
    answerText: {
        color: 'white', 
        fontSize: 16,
    },
    answerButton: {
        height: 40, 
        width: '30%', 
        backgroundColor: '#6200ee', 
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '100%',
        height: '45%',
    },
    modalTextBorder: {
        borderWidth: 1,
        borderColor: '#6200ee',
    },
    modalText: {
        marginTop: 4,
        marginBottom: 4,
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
    bottomScreenContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendContainer: {
        height: '45%',
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#6200ee',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    legendText: {
        color: 'black',
        fontSize: 15
    },
    legendImage: {
      width: 20,
      height: 20,
    },
    legend: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressContainer: {
        height: '55%',
        width: '100%',
        backgroundColor: '#6200ee',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    progressText: {
        color: 'white',
        fontSize: 20,
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