/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import analytics from '@react-native-firebase/analytics';
import AuthContext from "../../../../context/auth/authContext";
import moment from "moment";
export const CardSocioLink = (props) => {

  const {
    title = "",
    contenido = "",
    image = "",
    links = "",
    navigation
  } = props || {};

  
  
  const { user, createAnalytics } = useContext(AuthContext);

  const guardarLogAnalytics = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha: moment().format('DD/MM/YY, HH:mm:ss'),
        evento: "consultar_socios",
        value: nombre
      }

      createAnalytics(user, array)


    }


  }

  const onPressCard = () => {

    let nombreA = "Socios|"+ title.replace(/ /g, "_")+"|Contenido_Interes";
    let nombreB = title;

    guardarLogAnalytics(nombreB)

    analytics().logScreenView({
      screen_name: nombreA,
      screen_class: nombreA,
    });

    navigation.navigate("SocioItem", { title, contenido, image, links });
  };

  const regex = /(<([^>]+)>)/gi;
  const result = title.replace(regex, "");
  let _title = result.substring(0, 60);

  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8 }}>
        <View style={styles.cardBodyTwo}>
          <View style={{
            flex: 1, padding: 25, justifyContent: 'center',
            alignItems: 'center',
          }}>
            {image !== undefined && image !=="" ?
              <Image
                style={{ width: 120, height: 60 }}
                source={{
                  uri: `${image}`,
                }}
                resizeMode="contain"
              />
              : null}
          </View>
          <View style={{ backgroundColor: "#000000", bottom: -10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 10, marginLeft: 30, marginRight: 30 }}>
            <Text style={styles.verMas} allowFontScaling={false}>
              {"+ Ver socio"}
            </Text>
          </View>
        </View>

      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    fontSize: metrics.HEIGHT * 0.018,
    //lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#003031",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
    fontFamily:'Dosis-Regular'
  },
  verMas: {
    fontSize: metrics.HEIGHT * 0.015,
    //lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily:'Dosis-Regular'
  },
  wraper: {
    width: "50%",
    padding: 20,
  },
  wraperTwo: {
    width: "33%",
    padding: 11,
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    height: metrics.HEIGHT * 0.20,
    width: metrics.WIDTH * 1,
    borderRadius: 8,
    shadowColor: "#030912",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,
  },
  cardBodyTwo: {
    backgroundColor: "#FFFFFF",
    //flexDirection: "column",
    height: metrics.HEIGHT * 0.18,
    width: metrics.WIDTH * 0.40,
    borderRadius: 8,
    shadowColor: "#030912",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,


  },
  containeImage: {
    width: 120,
    height: 100,
    overflow: "hidden",
    resizeMode: "stretch",

  },
});
