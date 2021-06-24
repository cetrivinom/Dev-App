import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import Directory from '../directory';
import Settings from '../settings';
import Links from '../links';
import Favorites from '../favorites';
import Profile from '../profile';

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
      screen: Settings,
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
        tabBarLabel: 'Enlaces',
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
