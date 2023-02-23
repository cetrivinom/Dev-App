import React from "react";
import {  StyleSheet,View, Text } from "react-native";
import {
  NavigationApps,
  actions,
  googleMapsTravelModes,
  mapsTravelModes,
} from "react-native-navigation-apps";
import { metrics } from "../../../utilities/Metrics";

const PointNavigationApp = ({ route, navigation }) => {
  const {
    id = "",
    Nombre_punto = "",
    Direccion = "",
    latitude = "",
    longitude,
  } = route.params || {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.caja1Text}>Haz clic en la aplicación de tu preferencia</Text>
      <NavigationApps
        row
        modalProps={{ animationType: "slide", transparent: false }}
        modalBtnCloseTitle={"close modal"}
        modalBtnOpenTitle={"open modal"}
        modalBtnCloseTextStyle={{ fontSize: 20 }}
        modalBtnOpenTextStyle={{ fontSize: 20 }}
        iconSize={100}
        viewMode={"view"}
        address={Direccion} // address to navigate by for all apps
        waze={{
          address: Direccion,
          lat: latitude,
          lon: longitude,
          action: actions.navigateByLatAndLon,
        }} // specific settings for waze
        googleMaps={{
          address: Direccion,
          lat: latitude,
          lon: longitude,
          action: actions.navigateByLatAndLon,
          travelMode: googleMapsTravelModes.driving,
        }} // specific settings for google maps
        maps={{
          address: Direccion,
          lat: latitude,
          lon: longitude,
          action: actions.navigateByLatAndLon,
          travelMode: mapsTravelModes.driving,
        }} // specific settings for maps
      />
    </View>
  );
};

const styles = StyleSheet.create({

  caja1Text: {
    fontSize: metrics.HEIGHT * 0.024,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: metrics.HEIGHT * 0.033,
    letterSpacing: 0.0015,
    alignSelf: "center",
    marginBottom:15
  },
})

export default PointNavigationApp;
