import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScannerStyles from '../styles/ScannerStyles'
import { Actions } from 'react-native-router-flux';
import { BarCodeScanner, Permissions } from 'expo';

export default class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };
  render() {
    return (
      <View style={ScannerStyles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={[StyleSheet.absoluteFill]
                  }/>}
                  <View style={ScannerStyles.topOverlay} />
                  <View style={ScannerStyles.leftOverlay} />
                  <View style={ScannerStyles.rightOverlay} />
                  <View style={ScannerStyles.bottomOverlay} />
                  <View style={ScannerStyles.topLeftCorner} />
                  <View style={ScannerStyles.topRightCorner} />
                  <View style={ScannerStyles.bottomLeftCorner} />
                  <View style={ScannerStyles.bottomRightCorner} />
                  <View style={ScannerStyles.header}>
                  <Text style={ScannerStyles.headerText}>Scan QR Code to start</Text>
                  </View>


        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
    Actions.pop()
  };
  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={ScannerStyles.bottomBar}>
        <View style={ScannerStyles.footer}>
        </View>
        <TouchableOpacity style={ScannerStyles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={ScannerStyles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ScannerStyles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={ScannerStyles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}
