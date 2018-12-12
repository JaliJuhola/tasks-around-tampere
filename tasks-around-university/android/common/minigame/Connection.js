import Pusher from 'pusher-js/react-native';


export function getSocketConnection() {
    Pusher.logToConsole = true;
    return new Pusher('9001161e48db4e48e5f0', {
        cluster: 'eu',
        forceTLS: true
    });

};
