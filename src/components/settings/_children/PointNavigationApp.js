import React from "react";
import { View } from "react-native";
import {
  NavigationApps,
  actions,
  googleMapsTravelModes,
  mapsTravelModes,
} from "react-native-navigation-apps";

const PointNavigationApp = (props) => {
  const {
    id = "",
    Nombre_punto = "",
    Direccion = "",
    latitude = "",
    longitude,
  } = props.navigation.state.params || {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

export default PointNavigationApp;
