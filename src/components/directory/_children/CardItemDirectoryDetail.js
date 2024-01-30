/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Linking } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";
import { metrics } from "../../../utilities/Metrics";
import _ from 'lodash';
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import AuthContext from "../../../../context/auth/authContext";

import moment from "moment";

const CardItemDirectoryDetail = (props) => {
  const { dataItemService, getDataDirectoryItemService } =
    useContext(IOMContext);
  const {
    departamento = "",
    title = "",
    subTitle = "",
    subTitle1 = "Humanity & Inclusion",
    subTitle2 = "3004255896 - 3148866747",
    subTitle3 = "Lunes - Viernes: 8:30 a.m. a 4:30 p.m.",
    lines = [],
  } = props || {};
  const [open, setOpen] = useState(false);
  
  const { user, createAnalytics } = useContext(AuthContext);


  const guardarLogAnalytics = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha:moment().format('DD/MM/YY, HH:mm:ss'),
        evento:"consultar_linea",
        value:nombre
      }

      createAnalytics(user,array)


    }


  }


  const onPressOpen = () => {

    let nombreA = departamento.replace(/ /g, "_") + "|" + title.replace(/ /g, "_") + "|Lineas Telefonicas";
    let nombreB = departamento + "|" + title ;

    guardarLogAnalytics(nombreB)
    
    analytics().logScreenView({
      screen_name: nombreA,
      screen_class: nombreA,
    });

    setOpen((prev) => !prev);
    getDataDirectoryItemService(subTitle);
  };

  const abrirWhatsapp = (mobileNumber) => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      alert('El numero es incorrecto para abrir la aplicacion');
      return;
    }
    let whatsAppMsg = "";
    // Using 91 for India
    // You can change 91 with your country code
    let url =
      'whatsapp://send?text=' +
      whatsAppMsg +
      '&phone=57' + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('No esta instalada la aplicacion de WhatsApp');
      });
  };


  const { descripcion = "" } = dataItemService || {};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerItem} onPress={onPressOpen}>
        <Text style={styles.textTitle}>{title}</Text>
        <Image
          style={{ marginRight: 10 }}
          source={
            !open
              ? require("../../../resources/images/riArrowDownsLine.png")
              : require("../../../resources/images/riArrowOpenLine.png")
          }
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.form}>
          {_.map(lines, (val, id) => {
            return <View key={id}>
              <Text style={styles.textDescripcion}>{descripcion}</Text>
              <View style={styles.textWrap}>
                <Text style={styles.textsubTitle1}>{val.NombreOrganizacion}</Text>
              </View>
              {val.descripcion_servicio !== "" && (
                <View style={styles.form1}>
                  <Text style={styles.textsubTitle1}>Descripcion del servicio</Text>
                </View>
              )}
              {val.descripcion_servicio !== "" && (
                <View style={styles.textWrap2}>
                  <Text style={styles.textDescripcion}>{val.descripcion_servicio}</Text>
                </View>
              )}
              {val.telefono_ !== "" && val.telefono_.length > 0 && (
                <View style={styles.form2}>


                  {val.telefono_ && val.telefono_.map((element, index) => {
                    let telefono = element.value.trim().replace(" ", "")
                    if (telefono !== "") {

                      return (
                        <View style={{ display: "flex", flexDirection: "row", marginVertical: 10 }}>

                          <Icon2 name="phone-alt" size={15} color="black" />
                          <TouchableOpacity
                            key={index}
                            onPress={() => Linking.openURL(`tel:${telefono}`)}
                          >
                            <Text key={index} style={styles.textOpenWhatsapp}>{telefono}</Text>
                          </TouchableOpacity>
                        </View>
                      )

                    }
                  })
                  }


                </View>)}
              {val.telefono !== "" && val.telefono.length > 0 && (
                <View style={styles.form2}>
                  {val.telefono && val.telefono.map((element, index) => {

                    let telefono = element.value.trim().replace(" ", "")

                    if (telefono.trim() !== "") {

                      return (
                        <View style={{ display: "flex", flexDirection: "row", marginVertical: 10 }}>
                          <Icon2 name="phone-alt" size={15} color="black" />
                          <TouchableOpacity
                            key={index}
                            onPress={() => Linking.openURL(`tel:${telefono}`)}
                          >
                            <Text key={index} style={styles.textOpenWhatsapp}>{telefono}</Text>
                          </TouchableOpacity>

                        </View>
                      )

                    }
                  })
                  }

                </View>)}
              {val.whatsapp.length > 0 && (
                <View style={styles.form1}>
                  <Icon name="whatsapp" size={20} color="green" />
                  <View>
                    {val.whatsapp && val.whatsapp.map((element, index) => {

                      let telefono = element.value.trim().replace(" ", "")

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => abrirWhatsapp(telefono)}
                        >
                          <Text key={index} style={styles.textOpenWhatsapp}>{telefono}</Text>
                        </TouchableOpacity>
                      )


                    })
                    }
                  </View>

                </View>)}


              {val.horario.length > 0 && (
                <View style={styles.form1}>
                  <Icon3 name="time" size={20} color="black" />
                  <Text style={styles.textTitle2}>{val.horario}</Text>
                </View>
              )}
              {val.correo_electronico !== "" && (
                <View style={styles.form1}>


                  <Icon name="envelope-o" size={20} color="black" />
                  <TouchableOpacity
                    key={id}
                    onPress={() => Linking.openURL("mailto:" + val.correo_electronico)}
                  >
                    <Text style={styles.textOpenEmail}>{val.correo_electronico}</Text>
                  </TouchableOpacity>
                </View>


              )


              }
              {val.url_servicio.length > 0 && (
                <View style={styles.form1}>
                  <Text style={styles.textsubTitle1}>Enlaces</Text>
                </View>
              )}
              {val.url_servicio.length > 0 && (
                <View style={styles.textWrap}>
                  <TouchableOpacity
                    key={id}
                    style={styles.boxOpenLink}
                    onPress={() => Linking.openURL(val.url_servicio[0].uri)}
                  >
                    <Text style={styles.textOpenLink}>{val.url_servicio[0].title}</Text>
                    <Image
                      source={require("../../../resources/images/riExternalLinkFill.png")}
                    />
                  </TouchableOpacity>
                </View>)}
            </View>
          })}
        </View>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.54,
    borderColor: "#A1AAB2",
    paddingLeft: metrics.WIDTH * 0.05,
  },
  textOpenLink: {
    fontSize: 13,
    color: "#00AAAD",
    lineHeight: 18,
    letterSpacing: 0.00125,
    marginRight: 10,
    paddingTop: 5,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#00AAAD",
  },

  textOpenEmail: {
    fontSize: 15,
    color: "#00AAAD",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#00AAAD",
    marginStart: 15,
  },

  textOpenWhatsapp: {
    fontSize: 15,
    color: "#003031",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#00AAAD",
    marginStart: 15,
  },


  boxOpenLink: {
    justifyContent: "flex-start",
    paddingVertical: metrics.HEIGHT * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  boxOpenMail: {
    justifyContent: "space-around",
    paddingVertical: metrics.HEIGHT * 0.01,
    flexDirection: "row",
    alignItems: "center",
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
    letterSpacing: 0.12,
    paddingRight: 20,
    color: "#003031",
    width: metrics.WIDTH * 0.8
  },
  textDescripcion: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: "#003031"
  },
  textDescripcionT: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: "#003031"
  },
  form: {
    marginBottom: 10,
    //marginRight:10,
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
  textWrap: {
    flexDirection: 'row'
  },
  textWrap2: {
    flexDirection: 'row',
    margin: 'auto',
    width: metrics.WIDTH * 0.9,
  },
  textsubTitle1: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#007681",
    flex: 0.95,
  },
  textsubTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 23,
    letterSpacing: 0.0015,
    color: "#007681",
  },
  form1: {
    marginTop: 10,
    flexDirection: "row",
  },
  form2: {
    marginTop: 10,
    flexDirection: "column",
  },
  textTitle2: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    marginStart: 15,
    flex: 0.95,
  },
  textTitle3: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#003031",
    flex: 0.95,
    marginStart: 15,
  },
});

export default CardItemDirectoryDetail;
