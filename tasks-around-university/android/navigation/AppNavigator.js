import React from 'react';
import { Platform, StyleSheet, Alert, Text, View, BackHandler } from 'react-native'
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import TabBarIcon from '../maingame/components/TabBarIcon';
import ScannerScreen from '../maingame/screens/ScannerScreen';
import PushTheButtonsScreen from '../pushthebuttons/screens/PushTheButtonsScreen';
import MapScreen from '../maingame/screens/MapScreen';
import StartScreen from '../maingame/screens/StartScreen';
import LobbyScreen from '../maingame/screens/LobbyScreen';
// import {GeocacheScreen} from '../geocache/GeocacheScreen';
import {AliasScreen} from '../minigame_alias/screens/AliasScreen';
import {QuiklashScreen} from '../maingame/components/Quiklash';
import {GeocacheScreen} from '../geocache/GeocacheScreen';
import IconSelect from '../maingame/components/IconSelect';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};


const stateHandler = (prevState, newState, action) => {
  console.log(prevState);
  console.log(newState);
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});



// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
  screenInterpolator:
    StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

//Android's back button, need logic here. Adding them later on.
const onBackAndroid = () => {
  console.log("*************************************************");
  console.log("Back Handler");
  if(Actions.currentScene === "main_map") {
    console.log("main_map scene asd");
  }
  if(Actions.currentScene === "start") {
    Alert.alert(
      'Quit?',
      'Do you want to close the game?',
      [
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  }
  if(Actions.currentScene === "IconSelect") {
    Actions.StartScreen();
  }
  if(Actions.currentScene === "Lobby") {
    //-> map
  }
  if(Actions.currentScene === "Minigame") {
    //-> map
  }
  if(Actions.currentScene === "scanner") {
    //-> map
  }
  
  console.log("*************************************************");
  return true;
}
const AppNavigator = () => (
  <Router
    createReducer={reducerCreate}
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    backAndroidHandler={onBackAndroid}
    uriPrefix={prefix}
    >
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox" hideNavBar={true} >
          <Stack key="root" hideNavBar={true} titleStyle={{ alignSelf: 'center' }}>
            <Scene hideNavBar hideTabBar>
              <Scene
                key="start"
                component={StartScreen}
                title="Start"
                tabBarLabel="Start"
                icon={TabBarIcon}
                hideNavBar={true}
                type="replace"
              />
              <Scene
                key="scanners"
                component={ScannerScreen}
                title="scanner"
                tabBarLabel="scanner"
                icon={TabBarIcon}
                type="replace"
              />
              <Scene
                key="push_the_buttons"
                component={PushTheButtonsScreen}
                title="push the buttons"
                tabBarLabel="push"
                icon={TabBarIcon}
                type="replace"
              />
              <Scene
                key="lobby"
                component={LobbyScreen}
                title="Lobby"
                tabBarLabel="lobby"
                icon={TabBarIcon}
                hideNavBar={true}
                type="replace"
              />
              <Scene
                key="main_map"
                component={MapScreen}
                title="Map"
                tabBarLabel="Map"
                icon={TabBarIcon}
                type="replace"
              />
              <Scene
                key="quiklash"
                component={QuiklashScreen}
                title="Quiklash"
                tabBarLabel="Quiklash"
                icon={TabBarIcon}
                hideNavBar={true}
                type="replace"
              />
              <Scene
                key="alias"
                component={AliasScreen}
                title="Alias"
                tabBarLabel="Alias"
                icon={TabBarIcon}
                type="replace"
              />
              <Scene
                key="cache"
                component={GeocacheScreen}
                title="Geocache"
                tabBarLabel="geo"
                icon={TabBarIcon}
                type="replace"
              />
              <Scene
                key="icon_select"
                component={IconSelect}
                title="IconSelect"
                tabBarLabel="icos"
                icon={TabBarIcon}
                type="replace"
              />
            </Scene>
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default AppNavigator;