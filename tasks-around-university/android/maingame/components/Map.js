import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { MapView } from 'expo';
import MapStyles from '../styles/MapStyles';
import CustomMapStyles from '../styles/CustomMapStyles.json';
import { Actions } from 'react-native-router-flux';

export default class Map extends React.Component {

  state = {

    userLocation: null,
    markers: [
      {
        title: 'Push the buttons',
        description: "Push the buttons:",
        distance: null,
        coordinates: {
          latitude: 61.494138,
          longitude: 23.779433,
        },
        userNear: false,
      },
      {
        title: 'Alias',
        description: "Alias:",
        distance: null,
        coordinates: {
          latitude: 61.492572,
          longitude: 23.778139,
        },
        userNear: false
      },
      {
        title: 'Geocache',
        description: "Geocache:",
        distance: null,
        coordinates: {
          latitude: 61.49396,
          longitude: 23.777845,
        },
        userNear: false
      },
      {
        title: 'Quiklash',
        description: "Quiklash:",
        distance: null,
        coordinates: {
          latitude: 61.495455,
          longitude: 23.778125,
        },
        userNear: false
      }
    ]
  };

  componentDidMount() {
    this.updateDistances();
  }

  updateUserLocation = () => {

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.02
          }
        });
      },
      err => console.log(err));
  }

  updateDistances = () => {

    this.updateUserLocation();
    if(this.state.userLocation != null) {
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
          this.state.markers[i].userNear = true;
        }
        else {
          this.state.markers[i].userNear = false;
        }
        this.state.markers[i].distance = Number((distance).toFixed(1));
        this.state.markers[i].description = "Distance: " + this.state.markers[i].distance + "m";

      }
    }
  }

  displayUserMarker() {
    if(this.state.userLocation != null) {
      return <MapView.Marker coordinate={this.state.userLocation}>
                <Image style={{ width: 30, height: 30 }} />
              </MapView.Marker>
    }
  }

  displayMarkers() {
    this.updateDistances();
    if(this.state.markers[0].distance != null) {
      var items = [Actions.push_the_buttons, Actions.alias, Actions.cache, Actions.quiklash, Actions.push_the_buttons, Actions.quiklash,Actions.push_the_buttons];
      return this.state.markers.map((marker, i) => (
        <MapView.Marker
          key={i}
          coordinate={marker.coordinates}
          pinColor={'#6200ee'}
          onCalloutPress={() => items[i]()}
        >
          <MapView.Callout>
            <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
            <Text>{marker.description}</Text>
          </MapView.Callout>
        </MapView.Marker>
      ))
    }
  }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 61.4941,
          longitude: 23.7784,
          latitudeDelta: 0.005,
          longitudeDelta:0.01
        }}
        style={MapStyles.map}
        customMapStyle={CustomMapStyles}
        showsUserLocation={true}
      >
        {this.displayMarkers()}
        {this.displayUserMarker()}
      </MapView>
    );
  }
}
