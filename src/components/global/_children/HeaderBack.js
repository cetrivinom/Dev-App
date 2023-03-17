import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import AuthContext from "../../../../context/auth/authContext";

const Header = (props) => {
  const {
    form,
    setForm,
    navigation,
    showBack = true,
    title = "Regístrate",
  } = props;
  const { config } = useContext(AuthContext);
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View>
      <View style={styles.statusBarBackground}>
      </View>
      <View style={styles.container}>
        <View style={styles.containerForm}>
          {showBack && (

          <View style={{flex:0.2}}>
            <TouchableOpacity onPress={onPressBack} style={styles.logo}>
              <Image source={require("../../../resources/images/left.png")} />
            </TouchableOpacity>
            </View>
          )}
          <View style={{flex:0.8, alignItems:'center', justifyContent:'center'}}> 
            <Text style={styles.labelTitle}>{title}</Text>
          </View>
          {!showBack && !config.anonymousAuth &&(
          <View style={{flex:0.2}}> 
            <TouchableOpacity onPress={onPressProfile} style={styles.image}>
              <Image 
                style={{
                  tintColor: "white",
                  height: 25,
                  width: 25
                }} 
                source={require("../../../resources/images/profile.png")} />
              <Text style={styles.textPerfil}>Mi Perfil</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: metrics.HEIGHT * 0.08,
    alignItems: "center",
    backgroundColor: "#00AAAD",
    justifyContent: "center",
  },
  containerForm: {
    flexDirection: "row",
  },
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.08 : 0,
    backgroundColor: "#00AAAD",
  },
  labelTitle: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#FFFFFF",    
    fontFamily:'Dosis-Medium',
  },
  logo: {
    marginLeft: 20
    //position: "absolute",
    //right: metrics.WIDTH * 0.53,
  },
  image: {
    //position: "absolute",
    //flexDirection: "column",
    alignItems:'center',
    //right: -metrics.WIDTH * 0.24,
    //top: -metrics.HEIGHT * 0.007,
  },
  textPerfil:{
    color:'#FFFFFF',
    fontSize:13,
    letterSpacing:0.04,
    lineHeight:14,
    marginTop:3,
    fontFamily:'Dosis-Regular'
  },
});

export default Header;
