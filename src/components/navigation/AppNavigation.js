import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Splash from "../global/Splash";
import Login from "../global/Login";
import Registre from "../global/Registre";
import Profile from "../global/Profile";
import Home from "../global/Home";
import DirectoryItem from "../global/_children/DirectoryItem";
import LinkItem from "../global/_children/LinkItem";
import FilterSetting from "../global/_children/FilterSetting";

const AppNavigation = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Registre: {
    screen: Registre,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  DirectoryItem: {
    screen: DirectoryItem,
    navigationOptions: {
      headerShown: false,
    },
  },
  LinkItem: {
    screen: LinkItem,
    navigationOptions: {
      headerShown: false,
    },
  },
  FilterSetting: {
    screen: FilterSetting,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigation);
