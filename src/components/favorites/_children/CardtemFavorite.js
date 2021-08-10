/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";
import { SvgCssUri } from 'react-native-svg';
import _ from 'lodash';

const CardItemFavorite = (props) => {
  const { id = "" } = props || {};
  const { dataPoint, getDataPoint, dataMapeoService } = useContext(IOMContext);

  useEffect(() => {
    getDataPoint();
  }, []);

  const {
    Nombre_punto = "",
    Estado = "",
    time = "8:00am - 5:00pm",
    point = 5,
    Servicios = [],
  } = dataPoint !== null ? dataPoint.find((item) => item.ID == id) : {};

  const onPressOpenPoint = (id) => {
    props.navigation.navigate("PointItem", { id });
  };

  const unique = [...new Set(Servicios.map(item => item.Servicio_id))];
  var services = [];


  _.map(unique,(val,id) => {
    var service = dataMapeoService.find((element) => {
      return element.id_servicio === val;
    });

    let index = services.findIndex(item => item.b64 == service.img_servicio_b64);

    if(service && index < 0){

      services.push({
        b64:service.img_servicio_b64,
        svg:<SvgCssUri
            height='32'
            width='32'
            uri={Platform.OS==='ios'?service.img_servicio_b64:'https://mapeo-de-servicios.gifmm-colombia.site'+service.img_servicio}
        />
      });
    }
    //console.log('Nombre_punto',Nombre_punto,'Servicios',Servicios,'uniqueServices',unique,'services',services);
  });

  let _Nombre_punto = Nombre_punto.substring(0, 25);

  return Nombre_punto !== "" ? (
    <TouchableOpacity style={styles.container} onPress={() => onPressOpenPoint(id)}>
      <View style={styles.containerFormTitle}>
        <Text style={styles.textTitle}>{_Nombre_punto + "..."}</Text>
        <Image source={require("../../../resources/images/riMoreLine.png")} />
      </View>
      <View style={styles.containerForm}>{_.map(services,(val) => {
        return val.svg
      })}
      </View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riMapPinFill.png")} />
        <Text style={styles.textTitle2}>{Estado}</Text>
      </View>
      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riTimeFill.png")} />
        <Text style={styles.textTitle2}>{time}</Text>
      </View>
    </TouchableOpacity>
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
