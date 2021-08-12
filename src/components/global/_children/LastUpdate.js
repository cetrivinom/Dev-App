import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import InitialContext from "../../../../context/initialData/initialContext";


const LastUpdate = () => {
  const { lastUpdate } = useContext(InitialContext);
  console.log('LastUpdate',lastUpdate)
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.labelTitle1}>Ultima actualización </Text>
        <Text style={styles.labelTitle2}>{lastUpdate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: metrics.HEIGHT * 0.04,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  containerForm: {
    flexDirection: "row",
    marginTop: metrics.HEIGHT * 0.01,
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
