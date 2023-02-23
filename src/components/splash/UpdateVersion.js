import { ImageBackground, Image, View, Text, TouchableHighlight, BackHandler, Platform } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { metrics } from "../../utilities/Metrics";
import { Linking } from 'react-native';
import AuthContext from "../../../context/auth/authContext";

const UpdateVersion = () => {
    const { getConfig, getDefaultConfig } = useContext(AuthContext);
    const [appStore, setAppStore] = useState("");
    const [playStore, setPlayStore] = useState("");

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", () => {
            BackHandler.exitApp();
        });

        getConfig().then((config) => {

            setAppStore(config.appStoreUrl);
            setPlayStore(config.playStoreUrl);

        })

    }, []);

    const onPressSalir = () => {

        BackHandler.exitApp();

    }

    const onPressActualizar = () => {

        if (Platform.OS === 'android') {
            openPlayStore();
        } else {
            openAppStore();
        }


    }

    const openAppStore = () => {
        Linking.canOpenURL(appStore).then(
            (supported) => {
                supported && Linking.openURL(appStore);
            },
            (err) => console.log(err)
        );
    };

    const openPlayStore = () => {
        Linking.canOpenURL(playStore).then(
            (supported) => {
                supported && Linking.openURL(playStore);
            },
            (err) => console.log(err)
        );
    };
    return (
        <ImageBackground
            source={require("../../resources/images/backgroundLogIn1.png")}
            style={styles.image}
        >
            <Image
                source={require("../../resources/images/Logo.png")}
                style={styles.logo}
            />

            <View style={styles.container2}>
                <Text style={styles.labelInicio}>Hay una nueva version disponible</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight style={styles.btnIniciar} onPress={onPressSalir}>
                        <Text style={styles.labelLogin}>Salir</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.btnIniciar} onPress={onPressActualizar}>
                        <Text style={styles.labelLogin}>Actualizar</Text>
                    </TouchableHighlight>
                </View>

            </View>

        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#00AAAD",
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        height: metrics.HEIGHT * 0.6,
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
    container2: {
        backgroundColor: "#FFFFFF",
        borderRadius: 40,
        height: metrics.HEIGHT * 0.19,
        margin: 10
        //marginTop:metrics.WIDTH*0.00,
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
    labelLogin: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 18,
        letterSpacing: 0.00125,
        textAlign: "center",
        paddingVertical: 12,
    },
    btnIniciar: {
        backgroundColor: "#132A3E",
        height: 42,
        borderRadius: 25,
        marginBottom: 24,
        width: metrics.WIDTH * 0.4
    }

});



export default UpdateVersion;