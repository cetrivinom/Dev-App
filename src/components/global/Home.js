import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import { createStackNavigator } from "react-navigation-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import Directory from '../directory';
import Settings from '../settings';
import Links from '../links';
import Favorites from '../favorites';
import Profile from '../profile';
import FilterSetting from "../settings/_children/FilterSetting";
import PointListResult from "../settings/_children/PointListResult";
import PointListResultList from "../settings/_children/PointListResultList";

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerShown: false,
    },
  },
  /*FilterSetting: {
    screen: FilterSetting,
    navigationOptions: {
      headerShown: false,
    },
  },*/
  PointListResult: {
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
  },
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: Main,
      navigationOptions: {
        tabBarLabel: 'Inicio',
        tabBarVisible: false,
        tabBarIcon: ({tintColor}) => (
          <Icon name="home-outline" color={tintColor} size={24} />
        ),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Puntos de servicio',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-location" color={tintColor} size={24} />
        ),
      },
    },
    Directory: {
      screen: Directory,
      navigationOptions: {
        tabBarLabel: 'Directorio',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-call-outline" color={tintColor} size={24} />
        ),
      },
    },
    Links: {
      screen: Links,
      navigationOptions: {
        tabBarLabel: 'Contenido',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-open-outline" color={tintColor} size={24} />
        ),
      },
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({tintColor}) => (
          <Icon name="bookmark-outline" color={tintColor} size={24} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    //router config
    initialRouteName: 'Home',
    order: ['Home', 'Settings', 'Directory', 'Links', 'Favorites'],
    //navigation for complete tab navigator
    tabBarOptions: {
      activeTintColor: '#00AAAD',
      inactiveTintColor: '#003031',
    },
  },
);
