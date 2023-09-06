/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import analytics from '@react-native-firebase/analytics';
export const CardEnlaceLink = (props) => {

    const {
        title = "",
        contenido = "",
        image = "",
        links = [],
        navigation
      } = props || {};
  const onPressCard = () => {

    let nombreA = "Enlaces|"+ title.replace(/ /g, "_")+"|Contenido_Interes";


      analytics().logScreenView({
        screen_name: nombreA,
        screen_class: nombreA,
      });

    navigation.navigate("EnlaceItem", { title, contenido, image, links });
  };

  const regex = /(<([^>]+)>)/gi;
  const result = title.replace(regex, "");
  let _title = result.substring(0, 60);

  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8 }}>
        <View style={styles.cardBodyTwo}>
          <View style={{ flex: 0.4 }}>
            <Image
              style={styles.containeImage}
              source={{
                uri: `https://mapeo-de-servicios.gifmm-colombia.site${image}`,
              }}
            />
          </View>
          <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center', alignItems:'center' }}>
            <Text style={styles.titleSection} allowFontScaling={false}>
              {_title}
            </Text>
          </View>
          <View style={{   backgroundColor:"#000000", bottom:-10, paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10, borderRadius:10, marginLeft:30, marginRight:30}}>
            <Text style={styles.verMas} allowFontScaling={false}>
              {"+ Conocer más"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    fontSize: metrics.HEIGHT*0.018,
    fontFamily:'Dosis-Bold',
    //lineHeight: 23,
    letterSpacing: 0.005,
    color: "#003031",
    textAlign: "center",
    textAlignVertical:"center",
    padding:5
  },
  verMas: {
    fontSize: metrics.HEIGHT*0.015,
    //lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily:'Roboto'
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
    width: 32,
    height: 32,
    marginTop:10,
    marginLeft:10
  },
});
