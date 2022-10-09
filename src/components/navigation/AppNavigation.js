import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Splash from "../splash";
import Login from "../login";
import Registre from "../registre";
import Profile from "../profile";
import Home from "../global/Home";
import UpdateProfile from "../profile/_children/UpdateProfileForm";
import DirectoryItem from "../directory/_children/DirectoryItem";
import LinkItem from "../links/_children/LinkItem";
import EnlaceItem from "../links/_children/EnlaceItem";
import SocioItem from "../links/_children/SocioItem";
import PointItem from "../settings/_children/PointItem";
import PointNavigationApp from "../settings/_children/PointNavigationApp";
import PointItemComents from "../settings/_children/PointItemComents";
import FilterSetting from "../settings/_children/FilterSetting";
import PointListResult from "../settings/_children/PointListResult";
import PointListResultList from "../settings/_children/PointListResultList";
import CardItemFavorite from "../favorites/_children/CardtemFavorite";
import analytics from "@react-native-firebase/analytics";
/**
 * Stack de navegacion, esta librería de React Navigation permite configurar la navegación del app
 */
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
  UpdateProfile: {
    screen: UpdateProfile,
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
  PointItem: {
    screen: PointItem,
    navigationOptions: {
      headerShown: false,
    },
  },
  PointNavigationApp: {
    screen: PointNavigationApp,
    navigationOptions: {
      headerShown: false,
    },
  },
  PointItemComents: {
    screen: PointItemComents,
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
  /*PointListResult: {
    screen: PointListResult,
    navigationOptions: {
      headerShown: false,
    },
  },
  PointListResultList: {
    screen: PointListResultList,
    navigationOptions: {
      headerShown: false,
    },
  },*/
  CardItemFavorite: {
    screen: CardItemFavorite,
    navigationOptions: {
      headerShown: false,
    },
  },
  EnlaceItem: {
    screen: EnlaceItem,
    navigationOptions: {
      headerShown: false,
    },
  },
  SocioItem: {
    screen: SocioItem,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppContainer = createAppContainer(AppNavigation);
//export default createAppContainer(AppNavigation);
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default () => {
  return <AppContainer
      onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          const previousRouteName = getActiveRouteName(prevState);
          
          if (previousRouteName !== currentRouteName) {
            //console.log('logScreenView',currentRouteName, currentRouteName);
            //analytics().logScreenView(currentRouteName, currentRouteName);
            analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
        }}
  />
}
