/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export const ItemMain = (props) => {
  const { image, title, name } = props;
  const onPressCard = () => {
    props.navigation.navigate(name);
  };
  console.log('metrics.WIDTH',metrics.WIDTH,'metrics.HEIGHT',metrics.HEIGHT)
  return (
    <Pressable onPress={onPressCard} style={image<3?styles.wraper:styles.wraperTwo}>
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
                  : image === "5" &&
                    require("../../../resources/images/profile.png")
              }
            />
          </View>
          <View style={{ margin: 12 }}>
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
    fontSize: metrics.HEIGHT*0.018,
    lineHeight: 23,
    letterSpacing: 0.005,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
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
    height: metrics.HEIGHT * 0.134,
    width: metrics.WIDTH * 0.27,
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
    width: "100%",
    resizeMode: "contain",
  },
});
