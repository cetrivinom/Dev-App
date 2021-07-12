/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useContext } from "react";
import Header from "../../global/_children/Header";
import LastUpdate from "../../global/_children/LastUpdate";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const PointListResult = (props) => {
  var payments = [];
  for (let i = 0; i < 5; i++) {
    payments.push(
      <Image key={i} source={require("../../../resources/images/hear.png")} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos de servicio" />
        <LastUpdate />
      </View>
      <View style={[styles.box, styles.box2]}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 4.570868,
            longitude: -74.297333,
            latitudeDelta: 1,
            longitudeDelta: 10,
          }}
        ></MapView>
        <View style={styles.overlay4}>
          <View style={styles.overlay3}>
            <View style={styles.container55}>
              <View style={styles.containerFormTitle}>
                <Text style={styles.textTitle}>
                  Consultorio Jurídico UDEA - ACNUR...
                </Text>
                <Image
                  source={require("../../../resources/images/riMoreLine.png")}
                />
              </View>
              <View style={styles.containerForm}>{payments}</View>
              <View style={styles.containerForm}>
                <Image
                  source={require("../../../resources/images/riMapPinFill.png")}
                />
                <Text style={styles.textTitle2}>Estado</Text>
              </View>
              <View style={styles.containerForm}>
                <Image
                  source={require("../../../resources/images/riTimeFill.png")}
                />
                <Text style={styles.textTitle2}>time</Text>
              </View>
              <View style={styles.box7}>
                <TouchableOpacity style={[styles.caja1]}>
                  <Text style={styles.textBoxCaja}>Ver más</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.caja1, styles.caja2]}>
                  <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                    ¿Cómo llegar?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flex: 7.3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    maxWidth: 340,
  },
  overlay4: {
    position: "absolute",
    flexDirection: "row",
    bottom: 24,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container55: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  containerFormTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerForm: {
    flexDirection: "row",
  },
  textTitle: {
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: "bold",
    color: "#003031",
  },
  box7: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caja1: {
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    borderWidth: 1,
    width: 150,
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

export default PointListResult;
