/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import HeaderItem from "../../global/_children/HeaderItem";
import ModalFilter from "../../links/_children/ModalFilter";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";

const FilterSetting = (props) => {
  const {
    dataPointState,
    dataPointDepartamento,
    dataPointMunicipio,
    getDataPointFilter,
  } = useContext(IOMContext);
  const [show, setShow] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openMunicipio, setOpenMunicipio] = useState(false);
  const [openDepartamento, setOpenDepartamento] = useState(false);
  const [typeService, setTypeService] = useState("");
  const [statusPoint, setStatusPoint] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [departamento, setDepartamento] = useState("");

  const onPressCancel = () => {
    setTypeService("");
    setStatusPoint("");
    setMunicipio("");
    setDepartamento("");
    setOpenDepartamento(false);
    setOpenMunicipio(false);
    getDataPointFilter(false);
  };

  const onPressFilter = () => {
    //getDataPointFilter(true);
    props.navigation.navigate("PointListResult");
  };

  return (
    <View style={styles.wrapper}>
      <HeaderItem {...props} title="Filtrar puntos de servicio" />
      <View style={[styles.box, styles.box2]}>
        <TouchableOpacity
          style={styles.box6}
          onPress={() => {
            setShow(true);
            setOpenDepartamento(true);
            setOpenStatus(false);
            setOpenMunicipio(false);
          }}
        >
          <Text style={styles.textBox}>
            {departamento != "" ? departamento : "Departamento"}
          </Text>
          <Image
            source={require("../../../resources/images/trailingIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box6}
          onPress={() => {
            setShow(true);
            setOpenMunicipio(true);
            setOpenStatus(false);
            setOpenDepartamento(false);
          }}
        >
          <Text style={styles.textBox}>
            {municipio != "" ? municipio : "Municipio"}
          </Text>
          <Image
            source={require("../../../resources/images/trailingIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box6}
          onPress={() => {
            setShow(true);
            setOpenStatus(true);
            setOpenMunicipio(false);
            setOpenDepartamento(false);
          }}
        >
          <Text style={styles.textBox}>
            {statusPoint != "" ? statusPoint : "Estado de punto"}
          </Text>
          <Image
            source={require("../../../resources/images/trailingIcon.png")}
          />
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <Text style={styles.textTitle2}>Tipo de servicio</Text>
        <TouchableOpacity
          style={styles.containerForm2}
          onPress={() => setTypeService("26")}
        >
          <Text style={styles.textTitle2}>Hospitales</Text>
          <Image
            source={
              typeService === "26"
                ? require("../../../resources/images/checkboxCircle.png")
                : require("../../../resources/images/unCheckboxCircle.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerForm2}
          onPress={() => setTypeService("42")}
        >
          <Text style={styles.textTitle2}>Centro de atención</Text>
          <Image
            source={
              typeService === "42"
                ? require("../../../resources/images/checkboxCircle.png")
                : require("../../../resources/images/unCheckboxCircle.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerForm2}
          onPress={() => setTypeService("31")}
        >
          <Text style={styles.textTitle2}>Hospedaje</Text>
          <Image
            source={
              typeService === "31"
                ? require("../../../resources/images/checkboxCircle.png")
                : require("../../../resources/images/unCheckboxCircle.png")
            }
          />
        </TouchableOpacity>

        <View style={styles.box7}>
          <TouchableOpacity style={[styles.caja1]} onPress={onPressCancel}>
            <Text style={styles.textBoxCaja}>Borrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.caja1, styles.caja2]}
            onPress={onPressFilter}
          >
            <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalFilter
        onClose={() => setShow(false)}
        show={show}
        placeholder={
          openStatus
            ? "Buscar Estado de Punto"
            : openDepartamento
            ? "Buscar Departamento"
            : openMunicipio
            ? "Buscar Municipio"
            : ""
        }
        data={
          openStatus
            ? dataPointState
            : openDepartamento
            ? dataPointDepartamento
            : openMunicipio
            ? dataPointMunicipio
            : []
        }
        setSearchTerm={
          openStatus
            ? setStatusPoint
            : openDepartamento
            ? setDepartamento
            : openMunicipio
            ? setMunicipio
            : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
