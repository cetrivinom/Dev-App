import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Image, View, Text, TouchableHighlight, BackHandler, Platform } from "react-native";
import LoginForm from "./_children/LoginForm";
import AuthContext from "../../../context/auth/authContext";
import IOMContext from "../../../context/iomData/iomContext";
import NetInfo from '@react-native-community/netinfo';
import Styles from "./styles";
import { StyleSheet } from "react-native";
import { metrics } from "../../utilities/Metrics";
const Login = (props) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const { auth, signInAnonymously, isSignIn, getUser, getConfig } = useContext(AuthContext);
  const { getUserComments } = useContext(IOMContext);

  useEffect(() => {

    NetInfo.fetch().then(state => {
      if (!state.isConnected)
        props.navigation.navigate("Home");
    });

    getConfig().then((config) => {
      if (config.anonymousAuth) {
        signInAnonymously().then((uid) => {
          if (uid) {
            getUser(uid);
            getUserComments(uid);
          }
        });
      } else {
        isSignIn().then((uid) => {
          if (uid) {
            getUser(uid);
            getUserComments(uid);
          }
          else setVisibleLogin(true);
        });
      }
    });

    if (auth) {
      props.navigation.replace("Home");
    }
  }, [auth]);

  return (
    visibleLogin &&
    (
      <View style={styles.containerTop}

      >

        <Image
          source={require("../../resources/images/iconapplogo.png")}
          style={styles.logo}
        />
        <Text style={styles.labelInicio}>¡Hola, te damos la bienvenida!</Text>
       
        <LoginForm {...props} />




      </View>
    )

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignContent: 'center',
    height: metrics.HEIGHT * 0.09,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#E6F7F7",
    paddingHorizontal: 20

  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: metrics.HEIGHT * 0.03,
    height: metrics.HEIGHT * 0.19,
  },
  labelInicio: {
    fontSize: 27,
    fontWeight: "400",
    lineHeight: 34,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#007681",
    marginBottom: 44,
    fontFamily:'Dosis-Regular'
  },


})

export default Login;
