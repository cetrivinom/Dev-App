import "react-native-gesture-handler";
import React, { useEffect,useState } from "react";
import AppNavigation from "./src/components/navigation/AppNavigation";
import AuthState from "./context/auth/authState";
import InitialState from "./context/initialData/initialState";
import IOMState from "./context/iomData/iomState";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('xxx');
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
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
      setVisible(true);
      setMessage(remoteMessage);
      console.log('Push notification recibida', remoteMessage);
    });
    return unsubscribe;
  }, []);
    
  return (
    <AuthState>
      <InitialState>
        <IOMState>
          <AppNavigation />
        </IOMState>
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
      </InitialState>
    </AuthState>
  );
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFMCToken()
  }
}

const getFMCToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('the old token',checkToken);
  if(!checkToken){
    try{
      const fcmToken = await messaging().getToken()
      if(!!fcmToken){
        console.log('fcmtoken generado', fcmToken);
        await AsyncStorage.setItem('fcmToken',fcmToken)
      }
    } catch (error){
      console.log('error getFMCToken' , error);
    }
  }
};

export const notificationListener = async () => {
  console.log('notificationListener')
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    console.log('background notification',remoteMessage.notification)
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('getInitialNotification',remoteMessage)
      if (remoteMessage) {
        setVisible(true);
        setMessage(remoteMessage);
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log('remote notification',remoteMessage.notification)
      }
    })
}

export default App;
