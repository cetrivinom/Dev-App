import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Platform, PermissionsAndroid, Dimensions, BackHandler } from "react-native";
import Header from "../global/_children/HeaderBack";
import LastUpdate from "../global/_children/LastUpdate";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import IOMContext from "../../../context/iomData/iomContext";
import AuthContext from "../../../context/auth/authContext";
import Icon from 'react-native-vector-icons/Ionicons';
import analytics from '@react-native-firebase/analytics';
import HeaderPoint from "../global/_children/HeaderPoint";
import { metrics } from "../../utilities/Metrics";
import moment from "moment";

const Settings = (props) => {
  const [position, setPosition] = useState({
    latitude: 4.570868,
    longitude: -74.297333,
    latitudeDelta: 1,
    longitudeDelta: 10,

  });
  const [marginBottomV, setMarginBottomV] = useState(0);
  const { dataPoint, getDataPoint, dataMapeoService, getDataMapeoService, dataMapeoState, getDataMapeoState } = useContext(IOMContext);
  const { config, createAnalytics, user } = useContext(AuthContext);

  const mapRef = React.createRef();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }
  //Validamos que se tenga permisos de ubicacion en el dispositivo
  useEffect( () => {

    async function localiza () {

      try {
        await (hasLocationPermission())
      } catch (e) {
        console.log('Error: ', e);
      }

    }
    localiza();
  }, []);


  useEffect( () => {
    async function margin () {
      setMarginBottomV(1);
    }
    margin();
    
  }, []);

    useEffect( () => {
      guardarLogAnalyticsI("puntos_servicio")
    
  }, []);

  useEffect(() => {
    console.log(config)
    if (dataPoint && dataPoint.length < 1) {
      getDataPoint(config.activeStates, config.activeVisible, config.activeType);
    }
    if (dataMapeoService && dataMapeoService.length < 1) {
      getDataMapeoService();
    }
    if (dataMapeoState && dataMapeoState.length < 1) {
      getDataMapeoState();
    }/*
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        console.log('Posicion Obtenida',coords )
      },
      error => {
        console.log('Errorrrrrrrrr')
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );*/
  }, []);

  const mapMarkers = () => {
    if (dataPoint !== null && dataPoint !== undefined && dataPoint.length !==0) {
      return dataPoint.map((item, index) => {
        if (item.Coordenadas !== "") {
          var icon = (dataMapeoState.find((state) => state.id_estado == item.Estado_id));
          let coor = item.Coordenadas.split(",");
          
          let latitude = parseFloat(coor[0]);
          let longitude = parseFloat(coor[1]);
          return (
            <Marker
              key={index}
              coordinate={{
                latitude,
                longitude,
                
              }}
              image={icon? { width: 28, height: 40 , uri: icon?.img_estado_b64}:require('../../resources/images/hear.png') }
              onPress={() => onPressOpenPoint(item.ID, latitude, longitude, icon?.img_estado_b64, item.Nombre_punto)}
            >
              
            </Marker>
          );
        }
      });
    }
  };

  const guardarLogAnalytics = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha: moment().format('DD/MM/YY, HH:mm:ss'),
        evento: "consultar_punto",
        value: nombre
      }

      createAnalytics(user, array)


    }


  }

  const guardarLogAnalyticsI = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha: moment().format('DD/MM/YY, HH:mm:ss'),
        evento: "ingreso_modulo",
        value: nombre
      }

      createAnalytics(user, array)


    }


  }

  const onPressOpenPoint = (id, latitude, longitude, uri, nombre) => {

    let nombreA = nombre.replace(/ /g, "_")+"|Mapeo_De_Servicios_Colombia_GIFMM";
    let nombreB = nombre;

   

    guardarLogAnalytics(nombreB)

    analytics().logScreenView({
      screen_name: nombreA,
      screen_class: nombreA,
    });

    analytics().logEvent('screen_view', { screen_name: nombreA });
    analytics().logSelectContent({
      content_type: 'point_opened',
      item_id: id,
    })
    props.navigation.navigate("PointItem", { id, latitude, longitude, uri, from:"SettingsStack" });
  };

  const onPressOpen = () => {
    props.navigation.navigate("FilterSetting");
  };

  var payments = [];
  for (let i = 0; i < 5; i++) {
    payments.push(
      <Image key={i} source={require("../../resources/images/hear.png")} />
    );
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permisos de ubicación',
          message: 'La aplicación requiere permisos de ubicación',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Si el usuario acepta los permisos de ubicación, obtenemos la posición del usuario
        console.log('entro 1 obtiene permisos');
        //await (getLocation())
      } else {
        //this.logIn();
        console.log('entro 2');
      }
      //return true;
    } else if (Platform.OS === 'ios') { 
      console.log('*** 1 ******************')
      /* TODO: Validar arrojar error que dice Geolocation.requestAuthorization('whenInUse') debe ser funcion
      await Geolocation.requestAuthorization('whenInUse');
      /*new Promise((resolve, reject) => {
        Geolocation.requestAuthorization('whenInUse', (status) => {
          console.log('*** 2 ******************')
          resolve(status);
        }, reject);
      }).then((status) => {
        console.log('*** 3 ******************')
        console.log('ok Solicitando permisos ios', status)
      }).catch((error) => {
        console.log('*** 4 ******************')
        console.log('error Solicitando permisos ios', error)
      });
      
      await Geolocation.requestAuthorization('whenInUse').then((status) => {
        console.log('*** 3 ******************')
        console.log('ok Solicitando permisos ios', status)
      }).catch((error) => {
        console.log('*** 4 ******************')
        console.log('error Solicitando permisos ios', error)
      });*/
      //getLocation(true);
      console.log('*** 5 ******************')
      console.log('entro 3');
    }
    return true;
  };

  // metodo para hacer zoom a la posicion actual del usuario. Se llama desde el custom button del mapa.
  const getLocation = async () => {
    let wPos = Geolocation.getCurrentPosition(
      ({ coords }) => {

        mapRef.current?.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.001,
        },1000);
        
      },
      error => {
        
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    )
    
  };

  const viewRegion = (region) => {

  }



  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={true} title="Puntos de servicio" />
        <LastUpdate />
      </View>
      <View style={{ flex: 1, flex: Platform.OS === "ios" ? 5.8 : 7.3, marginBottom: marginBottomV, marginTop:0 }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomControlEnabled={true}
          zoomEnabled
          initialRegion={{
            latitude: 4.570868,
            longitude: -74.297333,
            latitudeDelta: 1,
            longitudeDelta: 10,
          }}
          region={position}
          onRegionChange={region => viewRegion(region)}



        >
          {dataPoint !== null && mapMarkers()}
        </MapView>
        <View style={styles.overlayM}>
          <TouchableOpacity>
            <Icon
              name="locate-outline"
              onPress={getLocation}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlay2} onPress={onPressOpen}>
            <Image
              source={require("../../resources/images/riMapPinLine.png")}
            />
            <Text style={styles.textFilter}>Filtrar puntos de servicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  //content
  box2: {
    flex: Platform.OS === "ios" ? 5.8 : 7.3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    flexDirection: "row",
    bottom: 24,
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#132A3E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: metrics.WIDTH*0.7,
    padding: 10,
  },
  textFilter: {
    fontSize: 15,
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
  },
  overlayM: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(232, 236, 237, 0.7)",
    height: 40,
    width: 40,
    justifyContent: 'center',
      alignItems: 'center'
    
  },
});

export default Settings;
