
import MiniGameEntry from '../../common/minigame/Entry';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MapView } from 'expo';
import MapStyles from '../styles/MapStyles';
import CustomMapStyles from '../styles/CustomMapStyles.json';
import RandomQuestions from './RandomQuestions';
import TimerMixin from 'react-timer-mixin';
import {Http} from '../../core/connections/http';
import {Loading} from '../../common/Components/Loading';
import { MainView } from '../../common/Components/MainView';
import { Actions } from 'react-native-router-flux';
import settings from '../../Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from '../../core/auth/auth';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.markerImages = [require ('../assets/user_marker_1.png'),require ('../assets/user_marker_2.png'),require ('../assets/user_marker_3.png'),require ('../assets/user_marker_4.png'),require ('../assets/user_marker_5.png'),require ('../assets/user_marker_6.png')];
    this.state = {
      markerModalVisible: false,
      markerNearUser: false,
      mapUpdateInterval: 3000,
      currentUser: 0,
      userLocation: null,
      currentMarker: 0,
      teamProgress: 0,
      teamScore: 0,
      isLoading: true,
      minigameMarkers: [],
      userMarkers: [],
      team: [
        {
          name: "You",
          location: null,
        },
        {
          name: "team_member_2",
          location: {
            latitude: 61.492372,
            longitude: 23.778839,
          },
        },
        {
          name: "team_member_3",
          location: {
            latitude: 61.492772,
            longitude: 23.778539,
          },
        },
        {
          name: "team_member_4",
          location: {
            latitude: 61.492572,
            longitude: 23.778939,
          },
        },
        {
          name: "team_member_5",
          location: {
            latitude: 61.492552,
            longitude: 23.778919,
          },
        },
        {
          name: "team_member_6",
          location: {
            latitude: 61.492532,
            longitude: 23.778969,
          },
        },
      ],
      markers: [
        {
          title: 'Push the buttons',
          description: "",
          target_str: 'push_the_buttons',
          difficulty: "Easy",
          players: '2-6',
          disabled: false,
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          distanceText: null,
          coordinates: {
            latitude: 61.494138,
            longitude: 23.779433,
          },
          userNear: false
        },
        {
          title: 'Alias',
          description: "",
          target_str: 'alias',
          difficulty: "Easy",
          players: '2-6',
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          disabled: false,
          completed: false,
          distance: null,
          distanceText: null,
          coordinates: {
            latitude: 61.492572,
            longitude: 23.778139,
          },
          userNear: false
        },
        {
          title: 'Quiklash',
          description: "",
          target_str: 'quiklash',
          difficulty: "Normal",
          players: '2-6',
          disabled: true,
          score: 25,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          distanceText: null,
          coordinates: {
            latitude: 61.49396,
            longitude: 23.777845,
          },
          userNear: false
        },
        {
          title: 'GeoCache',
          description: "",
          target_str: 'cache',
          difficulty: "Hard",
          players: '2-6',
          disabled: false,
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          distanceText: null,
          coordinates: {
            latitude: 61.495455,
            longitude: 23.778125,
          },
          userNear: false
        },
        {
          title: 'Push the buttons 2',
          description: "",
          target_str: 'ptb2',
          difficulty: "Hard",
          players: '2-6',
          disabled: true,
          score: 0,
          hiscore: 0,
          timesPlayed: 0,
          completed: false,
          distance: null,
          distanceText: null,
          coordinates: {
            latitude: 61.494455,
            longitude: 23.777125,
          },
          userNear: false
        }
      ]
    };

  }

  componentDidMount() {
    // Initial map update
    this.updateUsersLocation();
    this.displayMinigameMarkers();
    // updating map every interval
    this.map_updater = this.updateMap();
    this.updateMinigameScore();
    this.updateOverallScore();
    if(this.state.minigameMarkers.length > 0) {
      this.setState({isLoading:false});
    }
  }

  //Updates map every interval
  updateMap = () => {
    return TimerMixin.setInterval(() => {
      this.updateUsersLocation();
      this.updateMinigameScore();
      this.updateOverallScore();
      if(this.state.minigameMarkers.length > 0) {
        this.setState({isLoading:false});
      }
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
          });
          self.displayUserMarkers();
          self.updateDistances();
          self.displayMinigameMarkers();
        });
        }
  }

  //Updates distances between users and markers
  updateDistances = () => {

    if(this.state.userLocation != null) {

      this.setState({markerNearUser: false});

      var newMarkers = this.state.markers.slice();

      var userLat = this.state.userLocation.latitude;
      var userLon = this.state.userLocation.longitude;
      for(var i = 0; i < this.state.markers.length; i++) {
        var markerLat = this.state.markers[i].coordinates.latitude;
        var markerLon = this.state.markers[i].coordinates.longitude;
        var disabled = this.state.markers[i].disabled;
        var r = 6371000;
        var distanceLat = (userLat - markerLat) * (Math.PI/180);
        var distanceLon = (userLon - markerLon) * (Math.PI/180);
        var a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) + (Math.cos((userLat) * (Math.PI/180))) * (Math.cos((markerLat) * (Math.PI/180))) * Math.sin(distanceLon/2) * Math.sin(distanceLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var distance = r * c;

        newMarkers[i].distance = distance;
        newMarkers[i].disabled = disabled;

        if(distance < 20) {
          newMarkers[i].userNear = true;
          this.setState({markerNearUser: true});
        }
        else {
          newMarkers[i].userNear = false;
        }
        if(distance > 1000) {
          newMarkers[i].distanceText = Number((distance/1000).toFixed(1)) + "km";;
        }
        else {
          newMarkers[i].distanceText = Number((distance).toFixed(1)) + "m";
        }

      }
      this.setState({markers: newMarkers});
    }
  }

  //Returns user-markers
  displayUserMarkers() {
    if(this.state.userLocation != null) {
      var userMarkers =  this.state.team.map((user, i) => {
        var color = "#0000FF";
        var name = user.name;
        if(user.type === 3) {
          color = "#02f2ff";
          name = "You";
        } else if(user.type === 2) {
          color = "#a00078"
          name = "Leader " + user.name;
        }
        if(user.location != null) {
          var markerImage = this.markerImages[0];
          if(i <= 5) {
           markerImage = this.markerImages[i];
          }
          return(
            <MapView.Marker
              id={Date.now() + i}
              key={Date.now() + i}
              coordinate={user.location}
              onPress={(e) => {e.stopPropagation();}}
              pinColor={color}
            >
              {/* <Image source={markerImage} style={MapStyles.userMarkerImage} /> */}
              <MapView.Callout tooltip={true}>
                <View style={MapStyles.userNameContainer}>
                  <Text style={MapStyles.userName}>
                    {name}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          )
        }
      });
      this.setState({
        userMarkers: userMarkers
      })
    }
  }

  //Returns minigame-markers
  displayMinigameMarkers() {
    var markers = this.state.markers.map((marker, i) =>  {
      let color = '#6200ee';
      var marker_pressed = (e) => {e.stopPropagation(); this.showModalWindow(i);}
      if(marker.disabled) {
        color = '#484848';
        marker_pressed = undefined;
      }
      if(marker.distance > 100 && !settings['debug']) {
        color = '#808080';
        marker_pressed = undefined;
      }
      if(marker.completed) {
        color = '#0EDA16';
      }
      return(
        <MapView.Marker
          id={Date.now() + i}
          key={Date.now() + i}
          coordinate={marker.coordinates}
          pinColor={color}
          onPress={marker_pressed}
        >
        </MapView.Marker>
      )
    })
    this.setState({
      minigameMarkers: markers
    })
  }

  showModalWindow(activatedMarker) {
    this.setState({currentMarker: activatedMarker, markerModalVisible: true});
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
    var self = this;
    Http.get('api/minigame/progression').then(function (response) {
      var newMarkers = self.state.markers.map((marker, i) =>  {
        marker.score = response['data'][marker['title']]['group'];
        marker.hiscore = response['data'][marker['title']]['world'];
        marker.timesPlayed = response['data'][marker['title']]['count'];
        if(marker.timesPlayed > 0) {
          marker.completed = true;
        }
        return marker;
      });
      self.setState({markers: newMarkers, teamProgress: parseFloat(response['data']['completion_percentage'] * 100).toFixed(1), teamScore: response['data']['total_score']});
    });
  }

  render() {
    // If not authenticated go back to startScreen
    Auth.not_auth();
    return (
      <MainView
      onExit={() => Actions.main()} mainTitle={"Kartta"}
      isLoading={this.state.isLoading}
      loadingTitle="Ladataan karttaa">
        <MapView
          initialRegion={{
            latitude: 61.4941,
            longitude: 23.7784,
            latitudeDelta: 0.005,
            longitudeDelta:0.01
          }}
          style={MapStyles.map}
          minZoomLevel={10}
          showsMyLocationButton={true}
          customMapStyle={CustomMapStyles}
        >
          {this.state.minigameMarkers}
          {this.state.userMarkers}
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
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Etäisyys: {this.state.markers[this.state.currentMarker].distanceText}</Text>
                  </View>
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Vaikeustaso: {this.state.markers[this.state.currentMarker].difficulty}</Text>
                  </View>
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Pelaajat: {this.state.markers[this.state.currentMarker].players}</Text>
                  </View>
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Huippupisteet: {this.state.markers[this.state.currentMarker].hiscore} Points</Text>
                  </View>
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Ryhmän huippupisteet {this.state.markers[this.state.currentMarker].score} Pisteet</Text>
                  </View>
                  <View style={MapStyles.modalTextBorder}>
                    <Text style={MapStyles.modalText}>Pelikerrat: {this.state.markers[this.state.currentMarker].timesPlayed}</Text>
                  </View>
                </View>
                <View style={MapStyles.modalDescription}>
                  <Text style={MapStyles.modalText}>Kuvaus: {this.state.markers[this.state.currentMarker].description}</Text>
                </View>
                <View style={MapStyles.modalButtonContainer}>
                  <TouchableOpacity style={MapStyles.modalButton} onPress={() => this.setState({markerModalVisible: false})}>
                    <Text style={MapStyles.modalButtonText}>Takaisin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={MapStyles.modalButton} onPress={() => this.playMinigame()}>
                    <Text style={MapStyles.modalButtonText}>Pelaa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={MapStyles.bottomScreenContainer}>
            <View style={MapStyles.legendContainer}>
              <View style={MapStyles.legend}>
                <Icon name="map-marker" color="#6200ee" size={20} />
                <Text style={MapStyles.legendText}>Aktiivinen minipeli</Text>
              </View>
              <View style={MapStyles.legend}>
                <Icon name="map-marker" color="#0EDA16" size={20} />
                <Text style={MapStyles.legendText}>Suoritettu minipeli</Text>
              </View>
              <View style={MapStyles.legend}>
                <Image source={this.markerImages[0]} style={MapStyles.legendImage}></Image>
                <Text style={MapStyles.legendText}>Pelaaja</Text>
              </View>
            </View>
            <View style={MapStyles.progressContainer}>
              <Text style={MapStyles.progressText}>Pisteet: {this.state.teamScore}</Text>
              <Text style={MapStyles.progressText}>Edistys: {this.state.teamProgress}%</Text>
            </View>
          </View>
        </MainView>
    );
  }
}