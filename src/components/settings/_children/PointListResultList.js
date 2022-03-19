/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import Header from "../../global/_children/Header";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";
import HeaderItem from "../../global/_children/HeaderItem";
import { metrics } from "../../../utilities/Metrics";
import { SvgCssUri } from 'react-native-svg';
import _ from 'lodash';

export const LastUpdate = (props) => {
  const {
    departamento = "",
    municipio = "",
    statusPoint = "",
  } = props.navigation.state.params || {};
  const onPressClose = () => {
    props.navigation.navigate("FilterSetting");
  };

  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerFormHeader}>
        <View style={styles.containerFormHeader2}>
          <Image
            source={require("../../../resources/images/riMapPinLine2.png")}
          />
          <Text style={styles.textTitle2}>
            {departamento + "/" + municipio + "/" + statusPoint}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressClose}>
          <Text style={styles.labelTitle2}>Volver a filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ItemCardPoint = (props) => {
  const {
    ID: id = "",
    Nombre_punto = "",
    Estado = "",
    Estado_id = "",
    time = "8:00am - 5:00pm",
    Coordenadas = "",
    Direccion = "",
    point = 5,
    Servicios = [],
  } = props.item || {};
  const { dataMapeoService, getDataMapeoService, dataMapeoState } = useContext(IOMContext);
  let _Nombre_punto = Nombre_punto.substring(0, 80);  
  const unique = [...new Set(Servicios.map(item => item.Servicio_id))];


  const onPressOpenPoint = (id) => {
    let coor = Coordenadas.split(",");
    let latitude = parseFloat(coor[0]);
    let longitude = parseFloat(coor[1]);
    let icon = (dataMapeoState.find((state) => state.id_estado == Estado_id));
    let uri = icon?.img_estado_b64;
    props.navigation.navigate("PointItem", { id, latitude, longitude, uri});
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

  var services = [];
  _.map(unique,(val,id) => {
    var service = dataMapeoService.find((element) => {
      return element.id_servicio === val;
    });

    //let index = services.findIndex(item => item.b64 == service.img_servicio_b64);

    if(service && services.findIndex(item => item.b64 == service.img_servicio_b64) < 0){
      services.push({
        b64:service.img_servicio_b64,
        svg:<SvgCssUri
            key={service.id_servicio}
            height='32'
            width='32'
            uri={Platform.OS==='ios'?service.img_servicio_b64:'https://mapeo-de-servicios.gifmm-colombia.site'+service.img_servicio}
        />
      });
    }
  });

  return Nombre_punto !== "" ? (
    <View style={styles.container1}>
      <View style={styles.containerFormTitle}>
        <Text style={styles.textTitle}>{_Nombre_punto}</Text>
      </View>

      <View style={{flex : 1, flexDirection:'row'}}>
        <View style={{flex:0.7}}>
          <View style={styles.containerForm}>{_.map(services,(val) => {
            return val.svg
          })}</View>
          <View style={styles.containerForm}>
            <Image source={require("../../../resources/images/riMapPinFill.png")} />
            <Text numberOfLines={1} style={styles.textTitle2}>{Estado}</Text>
          </View>
        </View>
        <View style={{flex:0.3}}>
          <View style={styles.box7}>
            <TouchableOpacity
              style={[styles.caja1, styles.caja2]}
              onPress={() => onPressOpenPoint(id)}
            >
              <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                Ver más
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.caja1, {marginTop:10}]}
              onPress={onPressOpenNavigationApps}
            >
              <Text style={[styles.textBoxCaja]}>¿Cómo llegar?</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      <View style={styles.containerForm}>
        <Image source={require("../../../resources/images/riTimeFill.png")} />
        <Text style={styles.textTitle2}>{time}</Text>
      </View>
    </View>
  ) : null;
};

const PointListResultList = (props) => {
  const { dataPointFilter } = useContext(IOMContext);
  const awesomeChildListRenderItem = ({ item }) => <ItemCardPoint {...props} item={item} />;
  const awesomeChildListKeyExtractor = (item) => item.ID;
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos de servicio" />
        <LastUpdate {...props} />
      </View>
      <View style={[styles.box, styles.box2]}>
        <FlatList
          data={dataPointFilter}
          renderItem={awesomeChildListRenderItem}
          keyExtractor={awesomeChildListKeyExtractor}
        />
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
    flex: Platform.OS === "ios" ? 6.2 : 7.3,
    backgroundColor: "#FFFFFF",
  },
  containerHeader: {
    height: metrics.HEIGHT * 0.06,
    backgroundColor: "#FFFFFF",
  },
  containerFormHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 15,
  },
  containerFormHeader2: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelTitle1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: 14,
    letterSpacing: 0.005,
  },
  labelTitle2: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FEC800",
    lineHeight: 14,
    letterSpacing: 0.004,
  },
  container1: {
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
    fontSize: 13,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0015,
    color: "#003031",
    marginTop: 2,
    marginStart: 10.5,
    width: metrics.WIDTH * 0.55
  },
  box7: {
    //flexDirection: "row",
    justifyContent: "space-between",
  },
  caja1: {
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    borderWidth: 1,
    width: metrics.WIDTH * 0.28,
    borderRadius: 25,
    borderColor: "#A1AAB2",
    //marginStart: 10,
  },
  caja2: {
    backgroundColor: "#132A3E",
  },

  textBoxCaja: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0125,
    color: "#132A3E",
  },
  textBoxCajaNegra: {
    color: "#FFFFFF",
  },
});

export default PointListResultList;
