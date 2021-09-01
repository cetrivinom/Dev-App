import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Header from "../global/_children/Header";
import LastUpdate from "../global/_children/LastUpdate";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import IOMContext from "../../../context/iomData/iomContext";

const Settings = (props) => {
  const [position, setPosition] = useState(null);
  const { dataPoint, getDataPoint, dataMapeoService, getDataMapeoService, dataMapeoState, getDataMapeoState } = useContext(IOMContext);

  useEffect(() => {
    if(dataPoint && dataPoint.length < 1)
      getDataPoint();
    if(dataMapeoService && dataMapeoService.length < 1)
      getDataMapeoService();
    if(dataMapeoState && dataMapeoState.length < 1)
      getDataMapeoState();
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
    if (dataPoint != null) {
      return dataPoint.map((item, index) => {
        var icon = (dataMapeoState.find((state) => state.id_estado == item.Estado_id));
        if (item.Coordenadas !== "") {
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
              onPress={() => onPressOpenPoint(item.ID,latitude,longitude,icon?.img_estado_b64)}
            >
              <Image style={{width: 28, height: 40}} source={{uri: icon?.img_estado_b64}}/>
            </Marker>
          );
        }
      });
    }
  };

  const onPressOpenPoint = (id,latitude,longitude,uri) => {
    props.navigation.navigate("PointItem", { id, latitude,longitude,uri});
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
          {dataPoint !== null && mapMarkers()}
        </MapView>
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
    //marginTop: 10,
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
    maxWidth: 238,
    padding: 10,
  },
  textFilter: {
    fontSize: 15,
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
    marginLeft: 5,
  },
});

export default Settings;
