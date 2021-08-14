import React, { useEffect, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
import IOMContext from "../../../context/iomData/iomContext";
import { metrics } from "../../utilities/Metrics";
//import AsyncStorage from "@react-native-community/async-storage";

const Splash = (props) => {
  const { getDataLink, updateLastUpdate } = useContext(InitialContext);
  const api = [
    "api-enlaces-de-interes.json",
    "api-mapeo.json",
    "lines.json",
    "api-lineas-telefonicas-servicios.json",
    "api-mapeo-servicios.json",
    "api-mapeo-estados.json",
  ];



  const { dataPoint, getDataPoint, dataMapeoService, getDataMapeoService, dataMapeoState, getDataMapeoState } = useContext(IOMContext);

  useEffect(() => {
    if(dataPoint && dataPoint.length < 1)
      getDataPoint();
    if(dataMapeoService && dataMapeoService.length < 1)
      getDataMapeoService();
    if(dataMapeoState && dataMapeoState.length < 1)
      getDataMapeoState();
    let i = 0;
    api.map((item) => {
      i += 1;
      return getDataLink(item);
    });
    if (i === api.length) {
      setTimeout(() => {
        updateLastUpdate();
        props.navigation.navigate("Login");
      }, 2000);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../resources/images/Splash.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00AAAD",
  },
  logo: {
    //top: 163,
    height: metrics.HEIGHT * 0.9,
    resizeMode: "contain",
  },
});

export default Splash;
