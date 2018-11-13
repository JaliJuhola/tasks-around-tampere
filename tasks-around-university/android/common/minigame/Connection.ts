import Pusher from 'pusher-js/react-native';


var socketConnection = undefined;

export default  function getSocketConnection() {
    Pusher.logToConsole = true;
    if(!socketConnection) {
        socketConnection = new Pusher('9001161e48db4e48e5f0', {
            cluster: 'eu',
            forceTLS: true
          });
    }

    return socketConnection;
}

