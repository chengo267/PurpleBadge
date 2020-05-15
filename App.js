import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import NewShopScreen from './src/screens/NewShopScreen';
import EnterScreen from './src/screens/EnterScreen';
import StayShopScreen from './src/screens/StayShopScrren';
import CreateUserScreen from './src/screens/CreateUserScreen';
import LoginScreen from './src/screens/LoginScreen';

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