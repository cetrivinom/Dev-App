import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AppNavigation from "./src/components/navigation/AppNavigation";
import AuthState from "./context/auth/authState";
import InitialState from "./context/initialData/initialState";
import IOMState from "./context/iomData/iomState";
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {

    messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      console.log(fcmToken)
    } else {
      // user doesn't have a device token yet
    } 
  });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
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
      </InitialState>
    </AuthState>
  );
};

export default App;
