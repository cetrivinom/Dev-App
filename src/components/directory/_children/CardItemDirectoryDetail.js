/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";

const CardItemDirectoryDetail = (props) => {
  const { dataItemService, getDataDirectoryItemService } =
    useContext(IOMContext);
  const {
    title = "",
    subTitle = "",
    subTitle1 = "Humanity & Inclusion",
    subTitle2 = "3004255896 - 3148866747",
    subTitle3 = "Lunes - Viernes: 8:30 a.m. a 4:30 p.m.",
  } = props || {};
  const [open, setOpen] = useState(false);

  const onPressOpen = () => {
    setOpen((prev) => !prev);
    getDataDirectoryItemService(subTitle);
  };

  const { descripcion = "" } = dataItemService || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerItem} onPress={onPressOpen}>
        <Text style={styles.textTitle}>{title}</Text>
        <Image
          source={
            !open
              ? require("../../../resources/images/riArrowDownsLine.png")
              : require("../../../resources/images/riArrowOpenLine.png")
          }
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.form}>
          <Text style={styles.textDescripcion}>{descripcion}</Text>
          <Text style={styles.textsubTitle1}>{subTitle1}</Text>
          <View style={styles.form1}>
            <Image
              source={require("../../../resources/images/phone.png")}
              style={styles.image2}
            />
            <Text style={styles.textTitle2}>{subTitle2}</Text>
          </View>
          <View style={styles.form1}>
            <Image
              source={require("../../../resources/images/riTimeFill.png")}
              style={styles.image2}
            />
            <Text style={styles.textTitle2}>{subTitle3}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.54,
    borderColor: "#A1AAB2",
    paddingHorizontal: 18,
  },
  containerItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 78,
  },
  textTitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#003031",
  },
  form: {
    marginBottom: 10,
  },
  textDescripcion: {
    fontSize: 13,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    textAlign: "justify",
    paddingBottom: 10,
  },
  textsubTitle1: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#007681",
  },
  form1: {
    marginTop: 10,
    flexDirection: "row",
  },
  textTitle2: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    marginStart: 15,
  },
});

export default CardItemDirectoryDetail;
