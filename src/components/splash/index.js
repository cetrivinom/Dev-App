import React, { useEffect, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
import IOMContext from "../../../context/iomData/iomContext";
import { metrics } from "../../utilities/Metrics";
//import AsyncStorage from "@react-native-community/async-storage";

const Splash = (props) => {
  const { getDataLink, updateLastUpdate } = useContext(InitialContext);
  const api = [
    "api-mapeo-estados.json",
    "api-enlaces-de-interes.json",
    "api-mapeo.json",
    "api-lineas-telefonicas.json",
    "api-lineas-telefonicas-servicios.json",
    "api-mapeo-servicios.json",
  ];



  const { dataPoint, getDataPoint, dataMapeoService, getDataMapeoService, dataMapeoState, getDataMapeoState } = useContext(IOMContext);

  useEffect(() => {
    let i = 0;
    api.map((item) => {
      i += 1;
      return getDataLink(item);
    });
    /*if(dataPoint && dataPoint.length < 1)
      getDataPoint();
    if(dataMapeoService && dataMapeoService.length < 1)
      getDataMapeoService();
    if(dataMapeoState && dataMapeoState.length < 1){
      getDataMapeoState();
    }*/
    if (i === api.length) {
      setTimeout(() => {
        getDataMapeoService();
        getDataPoint();
        getDataMapeoState();
      }, 3000);
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
