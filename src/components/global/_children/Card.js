/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export const ItemMain = (props) => {
  const { image, title, name } = props;
  const onPressCard = () => {
    props.navigation.navigate(name);
  };

  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8 }}>
        <View style={image<3?styles.cardBody:styles.cardBodyTwo}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.imgCover}
              source={
                image === "1"
                  ? require("../../../resources/images/mapPinFill.png")
                  : image === "2"
                  ? require("../../../resources/images/phoneFill.png")
                  : image === "3"
                  ? require("../../../resources/images/frame.png")
                  : image === "4"
                  ?  require("../../../resources/images/pointSave.png")
                  : image === "6"
                  ?  require("../../../resources/images/integracion.png")
                  : image === "5" &&
                    require("../../../resources/images/riUserFill.png")
              }
            />
          </View>
          <View style={{ margin: metrics.HEIGHT * 0.01 }}>
            <Text style={styles.titleSection} allowFontScaling={false}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    fontSize: metrics.HEIGHT*0.020,
    //lineHeight: 23,
    letterSpacing: 0.005,
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily:'Dosis-Bold'
  },
  wraper: {
    width: "50%",
    padding: 11,
  },
  wraperTwo: {
    width: "33%",
    padding: 11,
  },
  cardBody: {
    backgroundColor: "#00AAAD",
    flexDirection: "column",
    height: metrics.HEIGHT * 0.11,
    width: metrics.WIDTH * 0.44,
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
    backgroundColor: "#132A3E",
    //flexDirection: "column",
    height: metrics.HEIGHT * 0.11,
    width: metrics.WIDTH * 0.44,
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
  imgCover: {
    marginTop: 10,
    alignSelf: 'center',
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
});
