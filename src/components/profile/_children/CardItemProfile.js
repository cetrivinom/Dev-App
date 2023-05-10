/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const CardItemProfile = (props) => {
  const {
    title = "",
    subTitle = "",
    showImge = false,
    field = "",
    navigation
  } = props || {};
  const onPressOpen = () => {
    if (navigation)
    navigation.navigate("UpdateProfile", { field:field, navigation });
  };
  return (
    <TouchableOpacity style={styles.containerBody} onPress={onPressOpen}>
      <View style={styles.containerBody2}>
        <Text style={styles.labelTitle}>{title}</Text>
        {showImge && (
          <Image source={require("../../../resources/images/singleLine.png")} />
        )}
      </View>
      <Text style={styles.labelSubTitle}>{subTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    marginBottom: 20,
  },
  containerBody2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelTitle: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#003031",
    fontFamily:'Dosis-Regular'
  },
  labelSubTitle: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#A1AAB2",
  },
});

export default CardItemProfile;
