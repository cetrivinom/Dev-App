import { ImageBackground, Image, View, Text, TouchableHighlight, BackHandler, Platform } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { metrics } from "../../utilities/Metrics";
import { Linking } from 'react-native';
import AuthContext from "../../../context/auth/authContext";

const LoginRegisterScreen = () => {

    return (
        <ImageBackground
            source={require("../../resources/images/backgroundLogIn1.png")}
            style={styles.image}
        >
            <Image
                source={require("../../resources/images/Logo.png")}
                style={styles.logo}
            />

            <View style={styles.container}>
                <Text style={styles.labelInicio}>Inicia sesión</Text>

            </View>

        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        //marginTop:metrics.WIDTH*0.00,
      },
      image: {
        flex: 1,
        resizeMode: "contain",
        height: metrics.HEIGHT * 0.8,
        width: metrics.WIDTH,
        backgroundColor: "#00AAAD",
    },
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        marginTop: metrics.HEIGHT * 0.03,
        marginBottom: metrics.HEIGHT * 0.2,
        height: metrics.HEIGHT * 0.19,
    },
    containerForm: {
        marginHorizontal: 16,
      },
      s: {
        marginTop: 40,
      },
      labelInicio: {
        fontSize: 22,
        fontWeight: "500",
        lineHeight: 28,
        letterSpacing: 0.0015,
        textAlign: "center",
        color: "#003031",
        marginTop: 24,
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