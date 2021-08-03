/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderItem from "../../global/_children/HeaderItem";
import IOMContext from "../../../../context/iomData/iomContext";
import authContext from "../../../../context/auth/authContext";
import ServiceItem from "./ServiceItem";
import { capitalize } from "../../../utilities/helpers";
import { metrics } from "../../../utilities/Metrics";

const PointItem = (props) => {
  const { dataItem, getDataPointById, dataComments } = useContext(IOMContext);
  const { user } = useContext(authContext);
  const { id = "" } = props.navigation.state.params || {};

  const {
    Nombre_punto = "",
    Estado = "",
    Direccion = "",
    Departamento = "",
    Municipio = "",
    Coordenadas = "",
    Servicios = [],
  } = dataItem || {};

  useEffect(() => {
    getDataPointById(id);
  }, [id]);

  const onPressOpenComents = () => {
    props.navigation.navigate("PointItemComents", { id, Nombre_punto });
  };

  const onPressOpenNavigationApps = () => {
    let coor = Coordenadas.split(",");
    let latitude = parseFloat(coor[0]);
    let longitude = parseFloat(coor[1]);
    props.navigation.navigate("PointNavigationApp", {
      id,
      Nombre_punto,
      Direccion,
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.wrapper}>
      <HeaderItem {...props} title="Información de punto" />
      <View style={[styles.box, styles.box2]}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.divider}></View>
          <View style={styles.box5}>
            <View style={styles.caja1}>
              <Text style={styles.caja1Text}>{Nombre_punto}</Text>
              <TouchableOpacity
                style={styles.overlay}
                onPress={onPressOpenNavigationApps}
              >
                <Text style={styles.text}>¿Cómo llegar?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.box5}>
            <View style={styles.containerForm}>
              <Image
                source={require("../../../resources/images/riMapPinFill.png")}
              />
              <Text style={styles.textTitle2}>
                {capitalize(Estado.toLowerCase())}
              </Text>
            </View>
            <View style={styles.cajaDireccion}>
              <Text style={styles.textDireccion}>
                {Direccion.toUpperCase()}
              </Text>
            </View>
            <View style={styles.containerForm}>
              <Image
                source={require("../../../resources/images/riRoadMapFill.png")}
              />
              <Text style={styles.textTitle2}>
                {capitalize(Departamento.toLowerCase()) +
                  "- " +
                  capitalize(Municipio.toLowerCase())}
              </Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.box5}>
            <Text style={styles.textHorario}>Horario de punto</Text>
            <View style={styles.containerForm}>
              <Image
                source={require("../../../resources/images/riTimeFill.png")}
              />
              <Text style={styles.textTitle2}>
                Lunes - Viernes: 9:00 am-12:00 pm, 1:00 pm-4:00 pm
              </Text>
            </View>
            <View style={styles.containerForm}>
              <Image
                source={require("../../../resources/images/riTimeFill.png")}
              />
              <Text style={styles.textTitle2}>Sábado - Domingo: Cerrado</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.box5}>
            <Text style={styles.textHorario}>Servicios</Text>
            {Servicios.map((l, i) => (
              <ServiceItem
                {...props}
                key={i}
                Servicio={l.Servicio}
                Servicio_id={l.Servicio_id}
                Descripcion_Servicio={l.Descripcion_Servicio}
                Organizacion_es={l.Organizacion_es}
              />
            ))}
          </View>
          <View style={styles.divider}></View>
          <View style={styles.box5}>
            <Text style={styles.textComentario}>Tus comentarios</Text>

            {dataComments
              .filter((data) => data.pointID === id)
              .map((filtered) =>
                filtered.comments.map((l, i) => (
                  <View style={styles.cajaDireccion1} key={l.commentID}>
                    <View style={styles.containerForm}>
                      <Image
                        source={require("../../../resources/images/userIco.png")}
                      />
                      <Text style={styles.textTitle2}>{user.email}</Text>
                    </View>
                    <Text style={styles.textTitle3}>{l.comment}</Text>
                  </View>
                ))
              )}

            <TouchableOpacity onPress={onPressOpenComents}>
              <Text style={styles.textAgregarComentario}>
                Agregar comentario
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  box5: {
    marginRight: metrics.WIDTH * 0.055,
    marginLeft: metrics.WIDTH * 0.055,
    marginBottom: 10,
  },
  divider: {
    height: 3,
    backgroundColor: "#E7EAEC",
    borderWidth: 1,
    borderColor: "#E7EAEC",
    marginBottom: 16,
  },
  caja1: {
    flexDirection: "row",
  },
  overlay: {
    height: 34,
    width: metrics.WIDTH * 0.3,
    backgroundColor: "#132A3E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  caja1Text: {
    width: metrics.WIDTH * 0.61,
    fontSize: metrics.HEIGHT * 0.024,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: metrics.HEIGHT * 0.033,
    letterSpacing: 0.0015,
    alignSelf: "stretch",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
  },
  containerForm: {
    flexDirection: "row",
    marginBottom: 10,
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
  cajaDireccion: {
    backgroundColor: "#132A3E",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginBottom: 10,
  },
  cajaDireccion1: {
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginBottom: 10,
  },
  textDireccion: {
    fontSize: 15,
    fontWeight: "normal",
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
  },
  textHorario: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    color: "#007681",
    letterSpacing: 0.0015,
    marginBottom: 8,
  },
  textComentario: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    color: "#003031",
    letterSpacing: 0.0015,
    marginBottom: 8,
  },
  textAgregarComentario: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#00AAAD",
    letterSpacing: 0.0125,
    marginStart: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  textTitle3: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#A1AAB2",
    marginTop: 2,
    textAlign: "justify",
  },
});

export default PointItem;
