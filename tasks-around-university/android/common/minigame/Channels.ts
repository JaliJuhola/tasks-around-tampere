import Pusher from 'pusher-js/react-native';
import axios from "axios";



const socket = new Pusher("9aef7be7bb27baad1641", {
    cluster: "eu",
    forceTLS: true,
    authorizer: function (channel, options) {
        return {
          authorize: function (socketId, callback) {
            axios.get('/user', {
                params: {
                  User_ID: 12345,
                  User_info: name,
                  Group_ID: 12345,
                  //TokenID: getToken
                }
              })
            callback(false, "authInformation");
          }
        };
    }
  });
class MinigameEntry {

    //NEEDS AUTHENTICATION REQUEST AS IT WILL NOT WORK WITHOUT IT
    public connectLobby(socket) {
        //var pusher = new pusher('9aef7be7bb27baad1641');
        socket.connection.bind('error', function(err) {
            if (err.error.data.code === 4004) {
                console.log('Over limit connections!');
            }
        })
        var channel = socket.subscribe('presence-lobby-channel');

        channel.bind('pusher:subscription_succeeded', function(members) {
            members.count;

            members.each(function(member) {
                member += member.id;
            })
        })
        var count = socket.members.count;
        this.connectGame(count);
        //if(lobby exitted)
            //this.disconnectLobby(socket)
        return count;
    }

    public connectGame(count) {
        //if (count == group.playercount)
            var pusher = new pusher('9aef7be7bb27baad1641', {
            cluster: 'eu',
            forceTLS: true
            });
            pusher.connection.bind('error', function(err) {
                if (err.error.data.code === 4004) {
                    console.log('Over limit connections!');
                }
            })
        var channelGame = pusher.subscribe('game-channel');

        //if(game exitted)
            //this.disconnectGame()
    }

    public disconnectLobby(socket) {
        socket.unsubscribe('presence-lobby-channel');
        socket.bind('pusher:member_removed', function (member) {
            this.remove_member(member.id)
           
        });

        socket.bind('pusher:connection_disconnected', function(member){
            // clear the member list in the UI for consistency
            this.remove_member(member.id)
          });
    }

    public add_member(member, channel) {
        
      }
    
    public remove_member(member, channel) {

    }
}