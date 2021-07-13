/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { metrics } from "../../../utilities/Metrics";

const LinkItem = (props) => {
  const onPressClose = () => {
    props.navigation.goBack();
  };
  const {
    resume = "",
    date = "",
    content = "",
    image = "",
  } = props.navigation.state.params || {};

  const regex = /(<([^>]+)>)/gi;
  const _resume = resume.replace(regex, "");
  const _content = content.replace(regex, "");

  return (
    <ScrollView style={styles.wrapper}>
      <TouchableOpacity style={styles.image} onPress={onPressClose}>
        <Image source={require("../../../resources/images/fab.png")} />
      </TouchableOpacity>
      <Image
        style={styles.containeImage}
        source={{
          uri: `https://dev-mapeo.us.tempcloudsite.com${image}`,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.textTitle}>{_resume}</Text>
        <View style={styles.containerDate}>
          <Image source={require("../../../resources/images/calendar.png")} />
          <Text style={styles.titleDate}>{date}</Text>
        </View>
        <Text style={styles.textContent}>{_content}</Text>
        <TouchableOpacity
          style={styles.boxOpenLink}
          onPress={() => Linking.openURL(`https://www.google.com`)}
        >
          <Text style={styles.textOpenLink}>Abrir enlace</Text>
          <Image
            source={require("../../../resources/images/riExternalLinkFill.png")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007681",
    lineHeight: 23,
    letterSpacing: 0.0015,
  },
  textContent: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 16,
    letterSpacing: 0.0025,
  },
  boxOpenLink: {
    justifyContent: "flex-start",
    paddingVertical: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  textOpenLink: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00AAAD",
    lineHeight: 18,
    letterSpacing: 0.00125,
    marginRight: 10,
    paddingTop: 5,
  },
  containerDate: {
    marginTop: 10,
    marginBottom: 20,
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
  image: {
    position: "absolute",
    top: metrics.HEIGHT * 0.04,
    left: 20,
    zIndex: 10,
  },
  containeImage: {
    overflow: "hidden",
    resizeMode: "cover",
    width: "100%",
    height: metrics.HEIGHT * 0.32,
  },
});

export default LinkItem;
