import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import AuthState from "./context/auth/authState";
import InitialState from "./context/initialData/initialState";
import IOMState from "./context/iomData/iomState";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./src/components/global/AppNavigation";
import * as RootNavigation from './RootNavigation'

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
          <AppNavigation/>
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

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

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
