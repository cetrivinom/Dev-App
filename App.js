import "react-native-gesture-handler";
import React from "react";
import AppNavigation from "./src/components/navigation/AppNavigation";
import AuthState from "./context/auth/authState";
import ServiceState from "./context/service/serviceState";
import LinkState from "./context/links/linkState";
import DirectoryState from "./context/directory/directoryState";

const App = () => {
  return (
    <>
      <AuthState>
        <ServiceState>
          <LinkState>
            <DirectoryState>
              <AppNavigation />
            </DirectoryState>
          </LinkState>
        </ServiceState>
      </AuthState>
    </>
  );
};

export default App;
