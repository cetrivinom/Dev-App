/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const ServiceItem = (props) => {
  return (
    <View style={styles.cajaDireccion}>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/hear.png")} />
        <Text style={styles.textTitle2}>{props.Servicio}</Text>
      </View>
      <View style={styles.containerForm2}>
        <Text>{props.Descripcion_Servicio}</Text>
      </View>
      <View style={styles.containerForm2}>
        <Text style={styles.textTitle3}>Organización(es) principal(es)</Text>
        <View>
          <Text style={styles.textTitle4}>{props.Organizacion_es}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cajaDireccion: {
    borderWidth: 1,
    borderColor: "#D0D4D8",
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginBottom: 12,
  },
  containerForm: {
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 10,
  },
  textTitle2: {
    flex: 1, 
    flexWrap: 'wrap',
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#007681",
    marginTop: 2,
    marginBottom: 5,
    marginStart: 10.5,
  },
  containerForm2: {
    paddingLeft: 45,
  },
  textTitle3: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    paddingTop: 8,
  },
  textTitle4: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    paddingTop: 8,
  },
});

export default ServiceItem;
