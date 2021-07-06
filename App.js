import "react-native-gesture-handler";
import React from "react";
import AppNavigation from "./src/components/navigation/AppNavigation";
import AuthState from "./context/auth/authState";
import InitialState from "./context/initialData/initialState";
import IOMState from "./context/iomData/iomState";

const App = () => {
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
