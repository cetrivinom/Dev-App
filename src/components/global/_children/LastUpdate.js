import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import InitialContext from "../../../../context/initialData/initialContext";
import IOMContext from "../../../../context/iomData/iomContext";


const LastUpdate = () => {
  const { lastUpdate, getDataLink, updateLastUpdate  } = useContext(InitialContext);
  const { getDataPoint, getDataMapeoService, getDataMapeoState } = useContext(IOMContext);

  const api = [
    "api-mapeo-estados.json",
    "api-enlaces-de-interes.json",
    "api-mapeo.json",
    "api-lineas-telefonicas.json",
    "api-lineas-telefonicas-servicios.json",
    "api-mapeo-servicios.json",
  ];

  const onPressUpdate = () => {
    let i = 0;
    api.map((item) => {
      i += 1;
      return getDataLink(item);
    });
    
    if (i === api.length) {
      setTimeout(() => {
        getDataPoint();
        getDataMapeoService();
        getDataMapeoState();
        updateLastUpdate();
      }, 5000);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.labelTitle1}>Ultima actualización </Text>
        <Text style={styles.labelTitle2}>{lastUpdate} </Text>
        <TouchableOpacity onPress={onPressUpdate}>
          <Image 
            style={{
              tintColor: "black",
              height: 15,
              width: 15
            }} 
            source={require("../../../resources/images/restart-line.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: metrics.HEIGHT * 0.04,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  containerForm: {
    flexDirection: "row",
    marginTop: metrics.HEIGHT * 0.01,
  },
  labelTitle1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: 14,
    letterSpacing: 0.005,
  },
  labelTitle2: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 14,
    letterSpacing: 0.004,
  },
});
export default LastUpdate;
