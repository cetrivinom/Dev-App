import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const HeaderItem = (props) => {
  const { title = "" } = props || {};
  const onPressClose = () => {
    props.navigation.goBack();
  };
  return (
    <View style={[styles.box, styles.box1]}>
      <View style={styles.boxImage}>
        <Image source={require("../../../resources/images/linkIcon.png")} />
      </View>
      <View style={styles.box4}>
        <TouchableOpacity onPress={onPressClose}>
          <Image
            source={require("../../../resources/images/riCloseLine.png")}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{title}</Text>
        <Image
          source={require("../../../resources/images/riBookmarkLine.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  boxImage: {
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#003031",
    lineHeight: 28,
    letterSpacing: 0.0015,
  },
  box4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginBottom: 30,
  },
});

export default HeaderItem;
