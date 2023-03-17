import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const HeaderFilterLink = ({ setShowFilterOption }) => {
  const onPressFilter = () => {
    setShowFilterOption((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <View style={styles.image}>
        </View>
        <Text style={styles.labelTitle1}></Text>
        <TouchableOpacity onPress={onPressFilter}>
          <Text style={styles.labelTitle2}>Filtrar contenido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    shadowColor: "#030912",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 7,
  },
  containerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelTitle1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: 14,
    textAlign: "left",
    letterSpacing: 0.005,
    marginStart: 48,
    fontFamily:'Dosis-Regular'
  },
  labelTitle2: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#902857",
    lineHeight: 14,
    textAlign: "right",
    letterSpacing: 0.004,
    marginEnd: 24,
  },
  image: {
    position: "absolute",
    left: 19,
    top: -4,
  },
});
export default HeaderFilterLink;
