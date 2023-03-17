import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
import IOMContext from "../../../context/iomData/iomContext";
import AuthContext from "../../../context/auth/authContext";
import NetInfo from '@react-native-community/netinfo';
import VersionCheck from "react-native-version-check";
import { Linking } from 'react-native';
import { StackActions, useNavigation } from "@react-navigation/native";
import LoginRegisterScreen from "./LoginRegisterScreen";
const Splash = (props) => {
  const { getDataLink, updateLastUpdate } = useContext(InitialContext);
  const { getConfig, getDefaultConfig } = useContext(AuthContext);
  let api = [
    "api-mapeo-estados.json",
    "api-enlaces-de-interes.json",
    "api-mapeo.json",
    "api-lineas-telefonicas.json",
    "api-lineas-telefonicas-servicios.json",
    "api-mapeo-servicios.json",
    "api_enlaces.json",
    "api_socios.json"
  ];

  const { dataPoint, getDataPoint, dataMapeoService, getDataMapeoService, dataMapeoState, getDataMapeoState } = useContext(IOMContext);
  const navigation = useNavigation()

  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 2000);
  }, []);


  useEffect(() => {

    if (authLoaded) {

      let i = 0;

      var current = VersionCheck.getCurrentVersion().toString();

      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          getDefaultConfig().then((config) => {
            props.navigation.navigate("Login");
          });
        } else {


          //var current ="1.031";
          getConfig().then((config) => {



            if (config.versionApp.toString() !== current.toString()) {


              getConfig().then((config) => {
                api = [
                  { name: 'api-mapeo-estados.json', val: config.apiMapeoEstados },
                  { name: 'api-enlaces-de-interes.json', val: config.apiEnlacesInteres },
                  { name: 'api-mapeo.json', val: config.apiMapeo },
                  { name: 'api-lineas-telefonicas.json', val: config.apiLineasTelefonicas },
                  { name: 'api-lineas-telefonicas-servicios.json', val: config.apiLineasTelefonicasServicios },
                  { name: 'api-mapeo-servicios.json', val: config.apiMapeoServicios },
                  { name: 'api_enlaces.json', val: config.apiMapeoEnlaces },
                  { name: 'api_socios.json', val: config.apiMapeoSocios }
                ];
                api.map((item) => {
                  i += 1;
                  return getDataLink(item.name, item.val);
                });
                if (i === api.length) {
                  setTimeout(() => {
                    getDataMapeoService();
                    getDataMapeoState();
                  }, 3000);
                  setTimeout(() => {
                    updateLastUpdate();
                    navigation.dispatch(navigation.replace("UpdateVersion"))
                  }, 2000);
                }
              });



            } else {

              NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                  getDefaultConfig().then((config) => {
                    props.navigation.navigate("Home");
                  });
                } else {
                  getConfig().then((config) => {
                    api = [
                      { name: 'api-mapeo-estados.json', val: config.apiMapeoEstados },
                      { name: 'api-enlaces-de-interes.json', val: config.apiEnlacesInteres },
                      { name: 'api-mapeo.json', val: config.apiMapeo },
                      { name: 'api-lineas-telefonicas.json', val: config.apiLineasTelefonicas },
                      { name: 'api-lineas-telefonicas-servicios.json', val: config.apiLineasTelefonicasServicios },
                      { name: 'api-mapeo-servicios.json', val: config.apiMapeoServicios },
                      { name: 'api_enlaces.json', val: config.apiMapeoEnlaces },
                      { name: 'api_socios.json', val: config.apiMapeoSocios }
                    ];
                    api.map((item) => {
                      i += 1;
                      return getDataLink(item.name, item.val);
                    });
                    if (i === api.length) {
                      setTimeout(() => {
                        getDataMapeoService();
                        getDataMapeoState();
                      }, 3000);
                      setTimeout(() => {
                        updateLastUpdate();
                        props.navigation.replace("Login");
                      }, 2000);
                    }
                  });
                }
              });

            }
          })
        }

      })

    }




    /*if(dataPoint && dataPoint.length < 1)
      getDataPoint();
    if(dataMapeoService && dataMapeoService.length < 1)
      getDataMapeoService();
    if(dataMapeoState && dataMapeoState.length < 1){
      getDataMapeoState();
    }*/

  }, [authLoaded, props.navigation]);

  return (
    <ImageBackground
      source={require("../../resources/images/Splash.png")}
      style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Splash;
