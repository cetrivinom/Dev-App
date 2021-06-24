import "react-native-gesture-handler";
import React from "react";
import AppNavigation from "./src/components/navigation/AppNavigation";
import AuthState from "./context/auth/authState";
import ServiceState from "./context/service/serviceState";

const App = () => {
  return (
    <>
      <AuthState>
        <ServiceState>
          <AppNavigation />
        </ServiceState>
      </AuthState>
    </>
  );
};

export default App;
