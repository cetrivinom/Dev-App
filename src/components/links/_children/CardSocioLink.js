/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export const CardSocioLink = (props) => {

    const {
        title = "",
        contenido = "",
        image = "",
        links = "",
      } = props || {};
  const onPressCard = () => {
    props.navigation.navigate("SocioItem", { title, contenido, image, links });
  };

  const regex = /(<([^>]+)>)/gi;
  const result = title.replace(regex, "");
  let _title = result.substring(0, 60);

  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8}}>
        <View style={styles.cardBodyTwo }>
          <View style={{ flex: 1, padding:25, justifyContent: 'center',
    alignItems: 'center',}}>
          <Image
          style={{width: 120,height:60}}
          source={{
            uri: `${image}`,
          }}
          resizeMode="contain"
        />
          </View>
          <View style={{ position:"absolute", left:"30%", backgroundColor:"#000000", bottom:-10, paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10, borderRadius:10,  zIndex:2}}>
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
    fontSize: metrics.HEIGHT*0.018,
    //lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#003031",
    textAlign: "center",
    textAlignVertical:"center",
    padding:10
  },
  verMas: {
    fontSize: metrics.HEIGHT*0.015,
    //lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
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
    height: metrics.HEIGHT * 0.25,
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
