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
import _ from 'lodash';

const EnlaceItem = ({ route, navigation }) => {
  const onPressClose = () => {
    navigation.goBack();
  };
  const {
    title = "",
    contenido = "",
    image = "",
    links = [],
  } = route.params || {};

  const regex = /(<([^>]+)>)/gi;
  const _content = contenido.replace(regex, "");
  return (
    <ScrollView style={styles.wrapper}>
      <TouchableOpacity style={styles.image} onPress={onPressClose}>
        <Image source={require("../../../resources/images/fab.png")} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textContent}>{_content}</Text>
        
        
        
        <View style={styles.viewLink}>
          <Text style={styles.textEnlace}>Enlaces:</Text>
        </View>
        <View>
          {_.map(links,(val,id) => {
            const link = val.indexOf('enlace:');
            const url = val.substring(link+7,val.length)
            const desc = val.substring(7,link-1)
            return <TouchableOpacity
                key={id}
                style={styles.boxOpenLink}
                onPress={() => Linking.openURL(url)}
              >
                <Text style={styles.textOpenLink}>{desc}</Text>
                <Image
                  source={require("../../../resources/images/riExternalLinkFill.png")}
                />
              </TouchableOpacity>
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    marginTop: metrics.HEIGHT * 0.11,
    marginHorizontal: 16,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#132A3E",
    lineHeight: 23,
    letterSpacing: 0.0015,
  },
  textEnlace: {
    fontSize: 16,
    color: "#132A3E",
    lineHeight: 23,
    letterSpacing: 0.0015,
  },
  textContent: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 16,
    letterSpacing: 0.0025,
  },
  boxOpenLink: {
    justifyContent: "flex-start",
    paddingVertical: metrics.HEIGHT * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  textOpenLink: {
    fontSize: 15,
    color: "#00AAAD",
    lineHeight: 18,
    letterSpacing: 0.00125,
    marginRight: 10,
    paddingTop: 5,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#00AAAD",
  },
  viewLink: {
    marginTop: metrics.HEIGHT * 0.05,
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
    top: metrics.HEIGHT * 0.05,
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

export default EnlaceItem;
