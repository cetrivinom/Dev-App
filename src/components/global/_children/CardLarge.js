/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export const ItemMainLarge = (props) => {
  const { image, title, name } = props;
  const onPressCard = () => {
    props.navigation.navigate(name);
  };

  return (
    <Pressable onPress={onPressCard} style={styles.wraper}>
      <View style={{ borderRadius: 8 }}>
        <View style={styles.cardBody}>
          
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
                  ?  require("../../../resources/images/inte_blanc.png")
                  : image === "5" &&
                    require("../../../resources/images/riUserFill.png")
              }
            />
          
          
            <Text style={styles.titleSection} numberOfLines={2} allowFontScaling={false}>
              {title}
            </Text>
         
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
    fontFamily:'Dosis-Bold',
    flex:0.80
  },
  wraper: {
    width: "100%",
    padding: 11,
  },
  wraperTwo: {
    width: "33%",
    padding: 11,
  },
  cardBody: {
    backgroundColor: "#00AAAD",
    flexDirection: "row",
    height: metrics.HEIGHT * 0.11,
    width: metrics.WIDTH * 0.95,
    borderRadius: 8,
    justifyContent:'center',
    shadowColor: "#030912",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,
    alignItems:"center",
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
    alignSelf: 'center',
    width: 38,
    height: 38,
  },
});
