import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Header from "../global/_children/Header";
import LastUpdate from "../global/_children/LastUpdate";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import ServiceContext from "../../../context/service/serviceContext";

const Settings = (props) => {
  const [position, setPosition] = useState(null);
  const { data, getDataService } = useContext(ServiceContext);

  useEffect(() => {
    getDataService();
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const mapMarkers = () => {
    if (data != null) {
      return data.map((item, index) => {
        if (item.Coordenadas !== "") {
          let coor = item.Coordenadas.split(",");
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(coor[0]),
                longitude: parseFloat(coor[1]),
              }}
              onPress={()=> onPressOpenPoint(item.ID)}
            ></Marker>
          );
        }
      });
    }
  };

  const onPressOpenPoint = (id) => {
    props.navigation.navigate("PointItem", {id});
  };

  const onPressOpen = () => {
    props.navigation.navigate("FilterSetting");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos de servicio" />
        <LastUpdate />
      </View>
      <View style={[styles.box, styles.box2]}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 4.570868,
            longitude: -74.297333,
            latitudeDelta: 1,
            longitudeDelta: 10,
          }}
        >
          {position && mapMarkers()}
        </MapView>
        <TouchableOpacity style={styles.overlay} onPress={onPressOpen}>
          <View style={styles.containerForm}>
            <Image
              source={require("../../resources/images/riMapPinLine.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Filtrar Puntos de servicio</Text>
          </View>
        </TouchableOpacity>
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
    flex: 7,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: "absolute",
    bottom: 24,
    height: 48,
    width: 238,
    backgroundColor: "#132A3E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 87,
  },
  text: {
    fontSize: 15,
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
    paddingStart: 25,
  },
  containerForm: {
    flexDirection: "row",
  },
  image: {
    position: "absolute",
    right: 175,
    top: -4,
  },
});

export default Settings;
