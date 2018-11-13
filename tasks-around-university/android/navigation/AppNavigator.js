import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
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
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import TabBarIcon from '../maingame/components/TabBarIcon';
import MenuIcon from './MenuIcon';
import DrawerContent from '../navigation/DrawerContent';
import HomeScreen from '../maingame/screens/HomeScreen';
import ScannerScreen from '../maingame/screens/ScannerScreen';
import PushTheButtonsScreen from '../pushthebuttons/screens/PushTheButtonsScreen';
import StartScreen from '../maingame/screens/StartScreen';
import LobbyScreen from '../maingame/screens/LobbyScreen';

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
  console.log('onStateChange: ACTION:', action);
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

const AppNavigator = () => (
  <Router
    createReducer={reducerCreate}
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox">
          <Stack key="root" hideNavBar titleStyle={{ alignSelf: 'center' }}>

            <Drawer
              hideNavBar
              key="drawer"
              onExit={() => {
                console.log('Drawer closed');
              }}
              onEnter={() => {
                console.log('Drawer opened');
              }}
              contentComponent={DrawerContent}
              drawerIcon={MenuIcon}
              drawerWidth={300}>
              <Scene hideNavBar>
                <Tabs
                  key="tabbar"
                  backToInitial
                  onTabOnPress={() => {
                    console.log('Back to initial and also print this');
                  }}
                  swipeEnabled
                  tabBarStyle={styles.tabBarStyle}
                  activeBackgroundColor="white"
                  inactiveBackgroundColor="rgba(255, 0, 0, 0.5)">
                  <Scene
                    key="main_home"
                    component={HomeScreen}
                    title="Home"
                    tabBarLabel="Home"
                    icon={TabBarIcon}
                  />
                  <Scene
                    key="scanners"
                    component={ScannerScreen}
                    title="scanner"
                    tabBarLabel="scanner"
                    icon={TabBarIcon}
                  />
                  <Scene
                    key="push_the_buttons"
                    component={PushTheButtonsScreen}
                    title="push the buttons"
                    tabBarLabel="button push"
                    icon={TabBarIcon}
                  />
                  <Scene
                    key="start"
                    component={StartScreen}
                    title="Start"
                    tabBarLabel="Start Screen"
                    icon={TabBarIcon}
					hideNavBar={true}
                  />
                  <Scene
                    key="lobby"
                    component={LobbyScreen}
                    title="Lobby"
                    tabBarLabel="Lobby Screen"
                    icon={TabBarIcon}
					hideNavBar={true}
                  />
                </Tabs>
              </Scene>
            </Drawer>
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default AppNavigator;