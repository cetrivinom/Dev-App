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

  console.log("data", data);

  const markerFavorites = [
    {
      latitude: 8.0908494233566,
      longitude: -76.727236307375,
      color: "#902857",
    },
    {
      latitude: 4.6557516012933,
      longitude: -74.1145247,
      color: "#902857",
    },
    {
      latitude: 4.1334319011476,
      longitude: -73.6288308,
      color: "#902857",
    },
    {
      latitude: 10.47501611426,
      longitude: -73.281171323194,
      color: "#00AAAD",
    },
    {
      latitude: 10.405701,
      longitude: -75.510129,
      color: "#00AAAD",
    },
    {
      latitude: 6.2549232017406,
      longitude: -75.5646485,
      color: "#00AAAD",
    },
    {
      latitude: 3.4199249005487,
      longitude: -76.491779849633,
      color: "#00AAAD",
    },
    {
      latitude: 7.9226194,
      longitude: -72.5205836,
      color: "#00AAAD",
    },
    {
      latitude: 5.5301355015375,
      longitude: -73.362832,
      color: "#00AAAD",
    },
    {
      latitude: 4.4782683466642,
      longitude: -75.2436045,
      color: "#00AAAD",
    },
    {
      latitude: 7.085979277684,
      longitude: -70.758028328419,
      color: "#00AAAD",
    },
  ];

  const mapMarkers = () => {
    return markerFavorites.map((report, index) => (
      <Marker
        key={index}
        coordinate={{ latitude: report.latitude, longitude: report.longitude }}
        pinColor={report.color}
      ></Marker>
    ));
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
