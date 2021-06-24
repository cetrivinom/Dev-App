/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

const FilterSetting = (props) => {
  const onPressClose = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.wrapper}>
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
          <Text style={styles.textTitle}>Filtrar puntos de servicio</Text>
          <Image
            source={require("../../../resources/images/riBookmarkLine.png")}
          />
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.textBox}>Departamento</Text>
            <Image
              source={require("../../../resources/images/trailingIcon.png")}
            />
          </View>
          <View style={styles.box6}>
            <Text style={styles.textBox}>Municipio</Text>
            <Image
              source={require("../../../resources/images/trailingIcon.png")}
            />
          </View>
          <View style={styles.box6}>
            <Text style={styles.textBox}>Estado de punto</Text>
            <Image
              source={require("../../../resources/images/trailingIcon.png")}
            />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.textTitle2}>Tipo de servicio</Text>
          <View style={styles.containerForm2}>
            <Text style={styles.textTitle2}>Hospitales</Text>
            <Image
              source={require("../../../resources/images/unCheckboxCircle.png")}
            />
          </View>
          <View style={styles.containerForm2}>
            <Text style={styles.textTitle2}>Centro de atención</Text>
            <Image
              source={require("../../../resources/images/unCheckboxCircle.png")}
            />
          </View>
          <View style={styles.containerForm2}>
            <Text style={styles.textTitle2}>Hospedaje</Text>
            <Image
              source={require("../../../resources/images/unCheckboxCircle.png")}
            />
          </View>
          <View style={styles.box7}>
            <View style={[styles.caja1]}>
              <Text style={styles.textBoxCaja}>Borrar</Text>
            </View>
            <View style={[styles.caja1, styles.caja2]}>
              <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                Filtrar
              </Text>
            </View>
          </View>
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
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
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
  box5: {
    marginTop: 31,
    marginHorizontal: 21,
  },
  box6: {
    flexDirection: "row",
    borderRadius: 3.5,
    borderColor: "#A1AAB2",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    height: 54,
    paddingHorizontal: 15,
    marginBottom: 33,
  },
  textBox: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
  },
  divider: {
    marginTop: 10,
    height: 2,
    backgroundColor: "#E7EAEC",
    borderWidth: 1,
    borderColor: "#E7EAEC",
    marginBottom: 16,
  },
  textTitle2: {
    fontSize: 17,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 23,
    letterSpacing: 0.0015,
  },
  containerForm2: {
    marginTop: 28,
    marginStart: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box7: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  caja1: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    borderWidth: 1,
    width: 175,
    borderRadius: 25,
    borderColor: "#A1AAB2",
  },
  caja2: {
    backgroundColor: "#132A3E",
    marginStart: 10,
  },
  textBoxCaja: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0125,
  },
  textBoxCajaNegra: {
    color: "#FFFFFF",
  },
});

export default FilterSetting;
