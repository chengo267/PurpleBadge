import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import NewShopScreen from './src/screens/NewShopScreen';
import EnterScreen from './src/screens/EnterScreen';
import StayShopScreen from './src/screens/StayShopScrren';
import CreateUserScreen from './src/screens/CreateUserScreen';
import LoginScreen from './src/screens/LoginScreen';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDjBluS_61uj00Rtn_VS2iufonnSaPZ1kE",
  authDomain: "purplebadge-6e593.firebaseapp.com",
  databaseURL: "https://purplebadge-6e593.firebaseio.com",
  projectId: "purplebadge-6e593",
  storageBucket: "purplebadge-6e593.appspot.com"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
database.ref('UsersDetails/' + "test").set({
  test: "test"
});


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    NewShop: NewShopScreen,
    Enter: EnterScreen,
    Stay: StayShopScreen,
    CreateUser: CreateUserScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);