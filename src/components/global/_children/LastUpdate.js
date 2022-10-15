import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import InitialContext from "../../../../context/initialData/initialContext";
import IOMContext from "../../../../context/iomData/iomContext";
import AuthContext from "../../../../context/auth/authContext";


const LastUpdate = () => {
  const { lastUpdate, getDataLink, updateLastUpdate  } = useContext(InitialContext);
  const { getDataPoint, getDataMapeoService, getDataMapeoState, getDataDirectory, getDataSocio } = useContext(IOMContext);
  const { config } = useContext(AuthContext);

  const api = [
    {name:'api-mapeo-estados.json',val:config.apiMapeoEstados},
    {name:'api-enlaces-de-interes.json',val:config.apiEnlacesInteres},
    {name:'api-mapeo.json',val:config.apiMapeo},
    {name:'api-lineas-telefonicas.json',val:config.apiLineasTelefonicas},
    {name:'api-lineas-telefonicas-servicios.json',val:config.apiLineasTelefonicasServicios},
    {name:'api-mapeo-servicios.json',val:config.apiMapeoServicios},
    {name:'api_enlaces.json',val:config.apiMapeoEnlaces},
    {name:'api_socios.json',val:config.apiMapeoSocios}
  ];

  const onPressUpdate = () => {
    let i = 0;
    api.map((item) => {
      i += 1;
      return getDataLink(item.name,item.val);
    });
    
    if (i === api.length) {
      setTimeout(() => {
        getDataPoint(config.activeStates,config.activeVisible,config.activeType);
        getDataMapeoService();
        getDataMapeoState();
        getDataSocio();
        //getDataDirectory();
        updateLastUpdate();
      }, 5000);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.labelTitle1}>Última actualización </Text>
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
