import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LastUpdate = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.labelTitle1}>Ultima actualización </Text>
        <Text style={styles.labelTitle2}>DD/MM/AA 00:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  containerForm: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  labelTitle1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: 14,
    letterSpacing: 0.005,
  },
  labelTitle2: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 14,
    letterSpacing: 0.004,
  },
});
export default LastUpdate;
