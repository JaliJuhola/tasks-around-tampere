import Pusher from 'pusher-js/react-native';


export function getSocketConnection() {
    Pusher.logToConsole = true;
    return new Pusher('614d3af919c6a2043258', {
        cluster: 'eu',
        forceTLS: true
    });

};

