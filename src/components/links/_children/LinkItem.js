/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

const DirectoryItem = (props) => {
  const onPressClose = () => {
    props.navigation.goBack();
  };
  const {
    resume = "",
    date = "",
    content = "",
    image = "",
  } = props.navigation.state.params || {};
  
  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, styles.box1]}>
        <TouchableOpacity style={styles.image2} onPress={onPressClose}>
          <Image source={require("../../../resources/images/fab.png")} />
        </TouchableOpacity>
        <Image
          style={styles.containeImage}
          source={{
            uri: `https://dev-mapeo.us.tempcloudsite.com${image}`,
          }}
        />
        <View style={styles.boxTitle}>
          <Text style={styles.textTitle}>{resume}</Text>
          <View style={styles.containerDate}>
            <Image source={require("../../../resources/images/calendar.png")} />
            <Text style={styles.titleDate}>{date}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.boxTitle}>
          <Text>{content}</Text>
        </View>
        <View style={styles.boxTitle2}>
          <Text style={styles.textTitle2}>Abrir enlace</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 6,
  },
  //content
  box2: {
    flex: 6,
  },
  boxImage: {
    overflow: "hidden",
    resizeMode: "cover",
    width: "100%",
    height: 270,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007681",
    lineHeight: 23,
    letterSpacing: 0.0015,
  },
  boxTitle: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  boxTitle2: {
    marginTop: 30,
    marginStart: 12,
  },
  textTitle2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00AAAD",
    lineHeight: 18,
    letterSpacing: 0.00125,
  },
  containerDate: {
    marginTop: 10,
    flexDirection: "row",
  },
  titleDate: {
    paddingStart: 9,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.0025,
    fontWeight: "normal",
    color: "#A1AAB2",
    paddingTop: 2,
  },
  image2: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  containeImage: {
    overflow: "hidden",
    resizeMode: "cover",
    width: "100%",
    height: 270,
  },
});

export default DirectoryItem;
