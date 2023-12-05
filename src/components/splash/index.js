import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, ImageBackground, Platform } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
import IOMContext from "../../../context/iomData/iomContext";
import AuthContext from "../../../context/auth/authContext";
import NetInfo from '@react-native-community/netinfo';
import VersionCheck from "react-native-version-check";
import { Linking } from 'react-native';
import { StackActions, useNavigation } from "@react-navigation/native";
import LoginRegisterScreen from "./LoginRegisterScreen";
import messaging from '@react-native-firebase/messaging';
import GetLocation from 'react-native-get-location'
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const Splash = (props) => {
  const { getDataLink, updateLastUpdate } = useContext(InitialContext);
  const { getConfig, getDefaultConfig, user } = useContext(AuthContext);
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
  
  

  const createCoordenadas = async (coordenadas) => {
    try {
      var value = JSON.parse(await AsyncStorage.getItem("coordenadas"));
      if (!value)
        value = [];
      
        value.push(coordenadas);
        AsyncStorage.setItem("coordenadas", JSON.stringify(value));
        
    
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Mensaje en splash', remoteMessage);
    });

    if (authLoaded) {

     GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {

        
      
      var array = {
        fecha:moment().format('DD/MM/YY, HH:mm:ss'),
        latitud:location.latitude,
        longitud: location.longitude
      }
      
      createCoordenadas(array)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })

      

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

            console.log(config)

            var versionReal = Platform.OS === 'android' ? config.versionApp : config.versionAppIos;
            
            if (versionReal.toString() !== current.toString()) {


              getConfig().then((config) => {
                api = [
                  { name: 'api-mapeo-estados.json', val: config.apiMapeoEstados },
                  { name: 'api-enlaces-de-interes.json', val: config.apiEnlacesInteres },
                  { name: 'api-mapeo.json', val: config.apiMapeoM },
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
                    props.navigation.navigate("Main");
                  });
                } else {
                  getConfig().then((config) => {
                    api = [
                      { name: 'api-mapeo-estados.json', val: config.apiMapeoEstados },
                      { name: 'api-enlaces-de-interes.json', val: config.apiEnlacesInteres },
                      { name: 'api-mapeo.json', val: config.apiMapeoM },
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
