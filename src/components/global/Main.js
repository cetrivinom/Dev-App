import React, { useContext, useEffect }  from "react";
import { ImageBackground, Text, View, StyleSheet, BackHandler, ScrollView } from "react-native";
import { ItemMain } from "./_children/Card";
import LastUpdate from "./_children/LastUpdate";
import HeaderHome from "./_children/HeaderHome";
import AuthContext from "../../../context/auth/authContext";
import { metrics } from "../../utilities/Metrics";

const Main = (props) => {
  const { navigation } = props;
  const { user, signOut, config } = useContext(AuthContext);

  useEffect(() => {

    
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.navigate("Splash")

  }

  return (
    <ScrollView style={styles.container}>
      
      <View style = {{height:metrics.HEIGHT * 0.30, width:metrics.WIDTH}}>
    <HeaderHome/>
      </View>
      <View style = {{height:metrics.HEIGHT * 0.70, width:metrics.WIDTH}}>
      <Text style={styles.labelTitle}>¡Te damos la bienvenida!</Text>
        <Text style={styles.labelDescripcion}>
          Queremos brindarte la mejor ayuda, por eso hemos preparado las
          siguientes funciones para ti:
        </Text>
        <View style={styles.containerForm}>
          <ItemMain
            {...props}
            name="SettingsStack"
            title="Puntos de servicio"
            image="1"
          />
          <ItemMain
            {...props}
            name="Directory"
            title="Líneas Telefónicas"
            image="2"
          />
        </View>
        <View style={styles.containerForm2}>
          <ItemMain
            {...props}
            name="Links"
            title="Contenido de interés"
            image="3"
          />
          <ItemMain
            {...props}
            name="Favorites"
            title="Puntos guardados"
            image="4"
          />
          {!config.anonymousAuth && (
          <ItemMain
            {...props}
            name="Profile"
            title="Mi Perfil"
            image="5"
          />
          )}
          
        </View>
        
      </View>
      <View style={styles.containerFooter}>
        <LastUpdate />
        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height:metrics.HEIGHT,
    width:metrics.WIDTH
    
  },
  containerForm: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height:metrics.HEIGHT * 0.12,
    marginTop:metrics.HEIGHT * 0.05
  },
  containerForm2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: metrics.HEIGHT * 0.15,
    marginTop:metrics.HEIGHT * 0.05,
    marginBottom:10
  },
  labelTitle: {
    fontSize: 27,
    fontWeight: "bold",
    lineHeight: 34,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#007681",
    marginTop: metrics.HEIGHT * 0.05,
    fontFamily:'Dosis-Regular'
  },
  labelDescripcion: {
    fontSize: 15,
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginRight: 19,
    marginLeft: 13,
    textAlign: "center",
  },
  image: {
    flex: 1,
    borderWidth:1
  },
  logo: {
    top: 25,
    width: 263,
    height: 140,
    resizeMode: "contain",
  },
  containerFooter: {
    position:'absolute',
    bottom:0,
    letft:0,
    right:0,
    width:metrics.WIDTH,
    height:metrics.HEIGHT*0.05
  },
});

export default Main;
