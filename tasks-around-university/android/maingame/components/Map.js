
import MiniGameEntry from '../../common/minigame/Entry';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MapView } from 'expo';
import MapStyles from '../styles/MapStyles';
import CustomMapStyles from '../styles/CustomMapStyles.json';
import RandomQuestions from './RandomQuestions';
import TimerMixin from 'react-timer-mixin';
import {Http} from '../../core/connections/http';
import {getSocketConnection} from '../../common/minigame/Connection';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // Common data should be abstracted later
    this.pusher = getSocketConnection();
    // this.scoreHelper = new MiniGameScore(CommonData.getGroupId(), MINIGAME_KEY);

    this.state = {
      markerModalVisible: false,
      markerNearUser: false,
      mapUpdateInterval: 3000,
      currentUser: 0,
      userLocation: null,
      currentMarker: 0,
      teamProgress: 0,
      teamScore: 0,
      team: [
        {
          name: "You",
          avatar: '../assets/testmarker.png',
          location: null,
        },
        {
          name: "team_member_2",
          avatar: '../assets/testmarker.png',
          location: {
            latitude: 61.492372,
            longitude: 23.778839,
          },
        },
        {
          name: "team_member_3",
          avatar: '../assets/testmarker.png',
          location: {
            latitude: 61.492772,
            longitude: 23.778539,
          },
        },
        {
          name: "team_member_4",
          avatar: '../assets/testmarker.png',
          location: {
            latitude: 61.492572,
            longitude: 23.778939,
          },
        },
      ],
      markers: [
        {
          title: 'Push the Buttons',
          description: "Distance:",
          target_str: 'push_the_buttons',
          difficulty: "Easy",
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          coordinates: {
            latitude: 61.494138,
            longitude: 23.779433,
          },
          userNear: false
        },
        {
          title: 'Alias',
          description: "Distance:",
          target_str: 'alias',
          difficulty: "Easy",
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          coordinates: {
            latitude: 61.492572,
            longitude: 23.778139,
          },
          userNear: false
        },
        {
          title: 'Quiklash',
          description: "Distance:",
          target_str: 'quiklash',
          difficulty: "Normal",
          score: 25,
          hiscore: 0,
          timesPlayed: 0,
          completed: true,
          distance: null,
          coordinates: {
            latitude: 61.49396,
            longitude: 23.777845,
          },
          userNear: false
        },
        {
          title: 'GeoCache',
          description: "Distance:",
          target_str: 'cache',
          difficulty: "Hard",
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          coordinates: {
            latitude: 61.495455,
            longitude: 23.778125,
          },
          userNear: false
        }
      ]
    };

  }

  componentDidMount() {
    // Initial map update
    this.updateUsersLocation();
    // updating map every interval
    this.map_updater = this.updateMap();
    this.updateOverallScore();
  }

  //Updates map every interval
  updateMap = () => {
    return TimerMixin.setInterval(() => {
      this.updateUsersLocation();
    }, this.state.mapUpdateInterval);
  }

  updateUsersLocation = () => {
    var self = this;
    //User's location
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            latitudeDelta: 0.02,
          }
        });
      },
      err => console.log(err));
      //Team members' locations
      if(self.state.userLocation != null) {
        Http.post('api/location', {
          x: self.state.userLocation.longitude,
          y: self.state.userLocation.latitude
        }).then(function (response) {
          self.setState({
            team: response['data']['players'],
          })
        });
        }
        self.updateDistances();
  }

  //Updates distances between users and markers
  updateDistances = () => {

    if(this.state.userLocation != null) {

      this.setState({markerNearUser: false});

      newMarkers = this.state.markers.slice();

      userLat = this.state.userLocation.latitude;
      userLon = this.state.userLocation.longitude;
      for(i = 0; i < this.state.markers.length; i++) {
        markerLat = this.state.markers[i].coordinates.latitude;
        markerLon = this.state.markers[i].coordinates.longitude;
        r = 6371000;
        distanceLat = (userLat - markerLat) * (Math.PI/180);
        distanceLon = (userLon - markerLon) * (Math.PI/180);
        a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) + (Math.cos((userLat) * (Math.PI/180))) * (Math.cos((markerLat) * (Math.PI/180))) * Math.sin(distanceLon/2) * Math.sin(distanceLon/2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance = r * c;

        if(distance < 20) {
          newMarkers[i].userNear = true;
          this.setState({markerNearUser: true});
        }
        else {
          newMarkers[i].userNear = false;
        }
        newMarkers[i].distance = Number((distance).toFixed(1));
        newMarkers[i].description = "Distance: " + this.state.markers[i].distance + "m";

      }
      this.setState({markers: newMarkers});
    }
  }

  //Returns user-markers
  displayUserMarkers() {
    if(this.state.userLocation != null) {
      return this.state.team.map((user, i) => {
        if(user.location != null) {
          return(
            <MapView.Marker
              key={i}
              coordinate={user.location}
              onPress={(e) => {e.stopPropagation();}}
            >
              <Image source={require('../assets/testmarker.png')} style={MapStyles.userMarkerImage} />
              <MapView.Callout tooltip={true}>
                <View style={MapStyles.userNameContainer}>
                  <Text style={MapStyles.userName}>
                    {user.name}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          )
        }
      })
    }
  }

  //Returns minigame-markers
  displayMinigameMarkers() {
    if(this.state.markers[0].distance != null) {
      return this.state.markers.map((marker, i) =>  {
        color = '#6200ee';
        if(marker.completed) {
          color = '#0EDA16';
        }
        return(
          <MapView.Marker
            key={i}
            coordinate={marker.coordinates}
            pinColor={color}
            onPress={(e) => {e.stopPropagation(); this.showModalWindow(i);}}
          >
          </MapView.Marker>
        )
      })
    }
  }

  showModalWindow(activatedMarker) {
    this.setState({currentMarker: activatedMarker});
    this.setState({markerModalVisible: true});
  }

  playMinigame() {
    this.setState({markerModalVisible: false});
    MiniGameEntry.enter_lobby(this.state.markers[this.state.currentMarker].target_str);
  }
  //Updates overall score and progress
  updateOverallScore() {
    score = 0;
    progress = 0;
    for(i = 0; i < this.state.markers.length; i++) {
      score += this.state.markers[i].score;
      if(this.state.markers[i].completed) {
        progress++;
      }
    }
    this.setState({teamScore: score});
    this.setState({teamProgress: progress/i * 100});
  }

  //Updates minigame score
  updateMinigameScore(markerIndex, newScore) {

    newMarkers = this.state.markers.slice();
    if(newMarkers[markerIndex].score < newScore) {
      newMarkers[markerIndex].score = newScore;
    }
    if(newMarkers[markerIndex].hiscore < newScore) {
      newMarkers[markerIndex].hiscore = newScore;
    }
    newMarkers[markerIndex].timesPlayed++;
    newMarkers[markerIndex].completed = true;

    this.setState({markers: newMarkers});

  }

  render() {
    return (
      <View>
        <MapView
          initialRegion={{
            latitude: 61.4941,
            longitude: 23.7784,
            latitudeDelta: 0.005,
            longitudeDelta:0.01
          }}
          style={MapStyles.map}
          minZoomLevel={10}
          customMapStyle={CustomMapStyles}
        >
          {this.displayMinigameMarkers()}
          {this.displayUserMarkers()}
        </MapView>
        <RandomQuestions markerNearUser={this.state.markerNearUser}></RandomQuestions>
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.markerModalVisible}
            style={MapStyles.modalWindowContainer}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={MapStyles.modalWindowContainer}>
              <View style={MapStyles.modalWindow}>
                <View style={MapStyles.modalPlaceContainer}>
                  <Text style={MapStyles.modalPlace}>{this.state.markers[this.state.currentMarker].title}</Text>
                </View>
                <View style={MapStyles.modalTextContainer}>
                  <Text style={MapStyles.modalText}>Difficulty: {this.state.markers[this.state.currentMarker].difficulty}</Text>
                  <Text style={MapStyles.modalText}>High-Score: {this.state.markers[this.state.currentMarker].hiscore} Points</Text>
                  <Text style={MapStyles.modalText}>Your best score: {this.state.markers[this.state.currentMarker].score} Points</Text>
                  <Text style={MapStyles.modalText}>Times played: {this.state.markers[this.state.currentMarker].timesPlayed}</Text>
                </View>
                <View style={MapStyles.modalDescription}>
                  <Text style={MapStyles.modalText}>Description: {this.state.markers[this.state.currentMarker].description}</Text>
                </View>
                <View style={MapStyles.modalButtonContainer}>
                  <TouchableOpacity style={MapStyles.modalButton} onPress={() => this.setState({markerModalVisible: false})}>
                    <Text style={MapStyles.modalButtonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={MapStyles.modalButton} onPress={() => this.playMinigame()}>
                    <Text style={MapStyles.modalButtonText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={MapStyles.bottomScreen}>
            <Text style={MapStyles.bottomScreenText}>Points: {this.state.teamScore}</Text>
            <Text style={MapStyles.bottomScreenText}>Progress: {this.state.teamProgress}%</Text>
          </View>
      </View>
    );
  }
}