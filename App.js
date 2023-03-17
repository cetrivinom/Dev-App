import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import AuthState from "./context/auth/authState";
import InitialState from "./context/initialData/initialState";
import IOMState from "./context/iomData/iomState";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Splash from "./src/components/splash";
import UpdateVersion from "./src/components/splash/UpdateVersion";
import Main from "./src/components/global/Main";
import Directory from "./src/components/directory";
import Login from "./src/components/login";
import LoginRegisterScreen from "./src/components/splash/LoginRegisterScreen";
import Registre from "./src/components/registre";
import Profile from "./src/components/profile";
import UpdateProfile from "./src/components/profile/_children/UpdateProfileForm";
import DirectoryItem from "./src/components/directory/_children/DirectoryItem";
import LinkItem from "./src/components/links/_children/LinkItem";
import PointItem from "./src/components/settings/_children/PointItem";
import PointNavigationApp from "./src/components/settings/_children/PointNavigationApp";
import PointItemComents from "./src/components/settings/_children/PointItemComents";
import FilterSetting from "./src/components/settings/_children/FilterSetting";
import CardItemFavorite from "./src/components/favorites/_children/CardtemFavorite";
import EnlaceItem from "./src/components/links/_children/EnlaceItem";
import SocioItem from "./src/components/links/_children/SocioItem";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Links from "./src/components/links";
import Favorites from "./src/components/favorites";
import Settings from "./src/components/settings";
import PointListResult from "./src/components/settings/_children/PointListResult";
import PointListResultList from "./src/components/settings/_children/PointListResultList";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Stack2 = createNativeStackNavigator();

function SettingsStack() {
  return (
    <Stack2.Navigator screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="Settings" component={Settings} />
      <Stack2.Screen name="PointListResult" component={PointListResult} />
      <Stack2.Screen name="PointListResultList" component={PointListResultList} />

    </Stack2.Navigator>

  )

}

function HomeBar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#00AAAD', tabBarStyle:{borderWidth:0},
    tabBarInactiveTintColor: '#003031' }} >
      <Tab.Screen name="Inicio" component={Main} options={{
        tabBarIcon: ({ color, number, focused }) => {
          return (
            <Icon name="home-outline" color={color} size={24} />
          );
        },
        tabBarLabel: 'Inicio',
        tabBarStyle: { display: 'none' }

      }}
      />
      <Tab.Screen name="SettingsStack" component={SettingsStack} options={{
        tabBarIcon: ({ color, number, focused }) => {
          return (
            <Icon name={focused?"md-location":"md-location-outline"} color={color} size={30} />
          );
        },
        tabBarLabel: 'Puntos de Servicio'

      }}
      />
      <Tab.Screen name="Directory" component={Directory} options={{
        tabBarIcon: ({ color, number, focused }) => {
          return (
            <Icon name={focused?"call-sharp":"call-outline"} color={color} size={24} />

          );

        },
        tabBarLabel: 'Directorio',
      }}
      />
      <Tab.Screen name="Links" component={Links} options={{
        tabBarIcon: ({ color, number, focused }) => {
          return (
            <Icon name="md-open-outline" color={color} size={24} />

          );

        },
        tabBarLabel: 'Contenido',
      }}
      />
      <Tab.Screen name="Favorites" component={Favorites} options={{
        tabBarIcon: ({ color, number, focused }) => {
          return (
            <Icon name={focused?"bookmark":"bookmark-outline"} color={color} size={24} />

          );

        },
        tabBarLabel: 'Favoritos',
      }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('xxx');
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
    console.log("Entre");
    
    requestUserPermission();
    notificationListener();
    /*console.log('ue messagin')
    messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      console.log('token:',fcmToken)
    } else {
      console.log('no token')
      // user doesn't have a device token yet
    } 
  });*/

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setVisible(false);
      setMessage(remoteMessage);
      console.log('Push notification recibida', remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthState>
      <InitialState>
        <IOMState>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="UpdateVersion" component={UpdateVersion} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
              <Stack.Screen name="Registre" component={Registre} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Home" component={HomeBar} />
              <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
              <Stack.Screen name="DirectoryItem" component={DirectoryItem} />
              <Stack.Screen name="LinkItem" component={LinkItem} />
              <Stack.Screen name="PointItem" component={PointItem} />
              <Stack.Screen name="PointNavigationApp" component={PointNavigationApp} />
              <Stack.Screen name="PointItemComents" component={PointItemComents} />
              <Stack.Screen name="FilterSetting" component={FilterSetting} />
              <Stack.Screen name="CardItemFavorite" component={CardItemFavorite} />
              <Stack.Screen name="EnlaceItem" component={EnlaceItem} />
              <Stack.Screen name="PointListResult" component={PointListResult} />
              <Stack.Screen name="PointListResultList" component={PointListResultList} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="SocioItem" component={SocioItem} />
            </Stack.Navigator>

          </NavigationContainer>
        </IOMState>
        {visible && <SafeAreaProvider>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            action={{
              label: "X",
              onPress: () => {
                setVisible(false);
              },
            }}
          >{message}
          </Snackbar>

        </SafeAreaProvider>
        }
      </InitialState>
    </AuthState>
  );
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('e', enabled)
  if (enabled) {
    getFMCToken()
  }
}

const getFMCToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  //console.log('checkToken',checkToken)
  //alert('checkToken '+checkToken)
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken()
      //alert('token',fcmToken)
      if (!!fcmToken) {
        await AsyncStorage.setItem('fcmToken ' + fcmToken)
      }
    } catch (error) {
      console.log('error getFMCToken', error);
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        setVisible(true);
        setMessage(remoteMessage);
      }
    })
}

export default App;
