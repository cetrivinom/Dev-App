import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AuthContext from "../../../../context/auth/authContext";
import { Snackbar } from "react-native-paper";
import { validateEmail } from "../../../utilities/helpers";
import Styles from "./styles";
import { metrics } from "../../../utilities/Metrics";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LoginFormD from "./LoginFormD";
import LoginFormR from "./LoginFormR";
const LoginForm = (props) => {

  const [index, setIndex] = React.useState(0);

  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'registro', title: 'Regístrarme' },
    { key: 'ingresar', title: 'Ingresar' },
  ]);


  const RegistreRoute = () => (

    <LoginFormR />

  );

  const LoginRoute = () => (
    <LoginFormD />
  );

  const renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
        >
          {route.title}
        </Text>
        
        <View style={{
          height: 0,               // height is '0' so that the view will not occupy space
          width: 100,              // as much as you want to 'Stretch' the underline
          borderTopColor: '#FFFFFF',
          borderTopWidth: 2,
          marginTop:5    // 'Gap' between the content & the underline 
      }} />
      
      </View>


    )
  }

  const renderScene = SceneMap({
    ingresar: LoginRoute,
    registro: RegistreRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{
        backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: "#00AAAD", elevation: 0,
        shadowOpacity: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        borderBottomWidth: 0
      }}
      renderLabel={renderLabel}
      indicatorStyle={{
        height: null,
        top: 0,
        backgroundColor: '#00AAAD',
        borderTopLeftRadius: 16, borderTopRightRadius: 16
      }}

    />
  );


  return (
    <View style={{ flex: 1 }} >
      {/* START FIX */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: metrics.WIDTH * 0.80 }}




        />
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'

  },
  containerTop: {
    flex: 1,
    backgroundColor: "#00AAAD",
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
    color: "#000",
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
  activeTabTextColor: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",


  },
  tabTextColor: {
    color: '#A1AAB2',
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",

  },


})

export default LoginForm;
