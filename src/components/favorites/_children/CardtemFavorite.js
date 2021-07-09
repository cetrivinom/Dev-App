/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";

const CardItemFavorite = (props) => {
  const { id = "" } = props || {};
  const { dataPoint, getDataPoint } = useContext(IOMContext);

  useEffect(() => {
    getDataPoint();
  }, []);

  const {
    Nombre_punto = "",
    Estado = "",
    time = "8:00am - 5:00pm",
    point = 5,
  } = dataPoint !== null ? dataPoint.find((item) => item.ID == id) : {};

  var payments = [];
  for (let i = 0; i < point; i++) {
    payments.push(
      <Image key={i} source={require("../../../resources/images/hear.png")} />
    );
  }

  let _Nombre_punto = Nombre_punto.substring(0, 25);

  return Nombre_punto !== "" ? (
    <View style={styles.container}>
      <View style={styles.containerFormTitle}>
        <Text style={styles.textTitle}>{_Nombre_punto + "..."}</Text>
        <Image source={require("../../../resources/images/riMoreLine.png")} />
      </View>
      <View style={styles.containerForm}>{payments}</View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riMapPinFill.png")} />
        <Text style={styles.textTitle2}>{Estado}</Text>
      </View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riTimeFill.png")} />
        <Text style={styles.textTitle2}>{time}</Text>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 12,
    borderBottomWidth: 3,
    borderColor: "#E7EAEC",
  },
  containerForm: {
    flexDirection: "row",
    marginBottom: 11,
  },
  containerFormTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: "bold",
    color: "#003031",
  },
  textTitle2: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    marginTop: 2,
    marginStart: 10.5,
  },
});

export default CardItemFavorite;
