import Pusher from 'pusher-js/react-native';


class Connection {
    static socketConnection = undefined;
    static getSocketConnection() {
        Pusher.logToConsole = true;
        if(!Connection.socketConnection) {
            Connection.socketConnection = new Pusher('9001161e48db4e48e5f0', {
                cluster: 'eu',
                forceTLS: true
              });
        }

        return Connection.socketConnection;
    }
}
export default Connection;

