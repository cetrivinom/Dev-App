import { ImageBackground, Image, View, Text, TouchableHighlight, BackHandler, Platform } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { metrics } from "../../utilities/Metrics";
import { Linking } from 'react-native';
import AuthContext from "../../../context/auth/authContext";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Registre from "../registre";
import Login from '../login/index';
import { useWindowDimensions } from 'react-native';
import { StackActions, useNavigation } from "@react-navigation/native";
const LoginRegisterScreen = () => {

  const navigation = useNavigation()
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'registro', title: 'Regístrarme' },
    { key: 'ingresar', title: 'Ingresar' },
  ]);

  const RegistreRoute = () => (
    <Registre navigation={navigation} />
  );

  const LoginRoute = () => (
    <Login navigation={navigation} />
  );

  const renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
        >
          {route.title}
        </Text>
      </View>
    )
  }

  const renderScene = SceneMap({
    ingresar: LoginRoute,
    registro: RegistreRoute,
  });

  const renderTabBar = props => (
    <TabBar
      renderLabel={renderLabel}
      {...props}
      indicatorStyle={{ backgroundColor: '#00AAAD' }}
      style={{ backgroundColor: '#FFF' }}
    />
  );

  return (
    <View style={styles.containerTop}

    >
      <Image
        source={require("../../resources/images/iconapplogo.png")}
        style={styles.logo}
      />

      <View style={styles.container}>
        <Text style={styles.labelInicio}>¡Hola, te damos la bienvenida!</Text>
        <View
          style={{
            borderBottomColor: '#003031',
            borderBottomWidth: 2,
            marginLeft: metrics.WIDTH * 0.40,
            marginRight: metrics.WIDTH * 0.40
          }}
        />
      </View>

      <View>

      <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}

        />

      </View>

    </View>
  )

}
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
    backgroundColor: "#FFFFFF"
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: metrics.HEIGHT * 0.03,
    height: metrics.HEIGHT * 0.19,
  },

  divider: {
    width: metrics.WIDTH * 0.5,
  },

  containerForm: {
    marginHorizontal: 16,
  },
  s: {
    marginTop: 40,
  },
  labelInicio: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#003031",
    marginTop: 12,
    marginBottom: 32,
  },
  labelAccount: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",
    color: "#003031",
  },
  labelForgetPassword: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    textDecorationLine: "underline",
    marginBottom: 32,
    marginTop: 30,
  },
  labelIngresa: {
    textAlign: "center",
    color: "#003031",
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
    marginBottom: 16,
  },
  labelLogin: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
  },

})

export default LoginRegisterScreen;