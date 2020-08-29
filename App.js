import fixTimerBug from './src/fixTimerBug';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import HomeScreenLog from './src/screens/HomeScreenLog';
import NewShopScreen from './src/screens/NewShopScreen';
import EnterScreen from './src/screens/EnterScreen';
import StayShopScreen from './src/screens/StayShopScrren';
import CreateUserScreen from './src/screens/CreateUserScreen';
import AuthScreen from './src/screens/AuthScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import QRcodeScannerScreen from './src/screens/QRcodeScannerScreen';
import MapScreen from './src/screens/MapScreen';
import * as firebase from 'firebase';
import "firebase/firestore";

import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

console.disableYellowBox = true;

const firebaseConfig = {
  apiKey: "AIzaSyDjBluS_61uj00Rtn_VS2iufonnSaPZ1kE",
  authDomain: "purplebadge-6e593.firebaseapp.com",
  databaseURL: "https://purplebadge-6e593.firebaseio.com",
  projectId: "purplebadge-6e593",
  storageBucket: "purplebadge-6e593.appspot.com",
  messagingSenderId: "764868294122",
  appId: "1:764868294122:web:9d27b6c8991771dfa1ee93",
};

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthScreen,
    CreateUser: CreateUserScreen,
    HomeLog: HomeScreenLog,
    Enter: EnterScreen,
    Stay: StayShopScreen,
    NewShop: NewShopScreen,
    QRcodeScanner: QRcodeScannerScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      title: "App",
      headerTitle:"התו הסגול",
      headerLeft: ()=>false
    },
  }
);

export default createAppContainer(navigator);