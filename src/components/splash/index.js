import React, { useEffect, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import InitialContext from "../../../context/initialData/initialContext";
//import AsyncStorage from "@react-native-community/async-storage";

const Splash = (props) => {
  const { getDataLink } = useContext(InitialContext);
  const api = [
    "api-enlaces-de-interes.json",
    "api-mapeo.json",
    "lines.json",
    "api-lineas-telefonicas-servicios.json",
    "api-mapeo-servicios.json"
  ];

  useEffect(() => {
    //AsyncStorage.clear()
    let i = 0;
    api.map((item) => {
      i += 1;
      return getDataLink(item);
    });
    if (i === api.length) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 2000);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../resources/images/Logo.png")}
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
    top: 163,
    height: 201.53,
    resizeMode: "contain",
  },
});

export default Splash;
