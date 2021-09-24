import React, { useEffect, useContext } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
import IOMContext from "../../../context/iomData/iomContext";

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
