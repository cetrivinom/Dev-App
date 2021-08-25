/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import Header from "../../global/_children/Header";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
import { metrics } from "../../../utilities/Metrics";
import { capitalize } from "../../../utilities/helpers";
import { SvgCssUri } from 'react-native-svg';
import _ from 'lodash';


export const LastUpdate = (props) => {
  const {
    departamento = "",
    municipio = "",
    statusPoint = "",
  } = props.navigation.state.params || {};
  const onPressClose = () => {
    props.navigation.goBack();
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
    time = "8:00am - 5:00pm",
    Coordenadas = "",
    Direccion = "",
    Servicios = [],
  } = props.item || {};
  const { dataMapeoService, getDataMapeoService } = useContext(IOMContext);
  let _Nombre_punto = Nombre_punto.substring(0, 25);
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
            key={service.id_servicio}
            height='32'
            width='32'
            uri={Platform.OS==='ios'?service.img_servicio_b64:'https://mapeo-de-servicios.gifmm-colombia.site'+service.img_servicio}
        />
      });
    }
  });

  const onPressOpenPoint = (id) => {
    props.navigation.navigate("PointItem", { id });
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
    <View style={styles.overlay3}>
      <View style={styles.overlay4}>
        <View style={styles.container55}>
          <View style={styles.containerFormTitle}>
            <Text style={styles.textTitle}>{_Nombre_punto + "..."}</Text>
            <Image
              source={require("../../../resources/images/riBookmarkLine2.png")}
            />
          </View>
          <View style={styles.containerForm}>{_.map(services,(val) => {
        return val.svg
      })}</View>
          <View style={styles.containerForm}>
            <Image
              source={require("../../../resources/images/riMapPinFill.png")}
            />
            <Text style={styles.textTitle2}>
              {capitalize(Estado.toLowerCase())}
            </Text>
          </View>
          <View style={styles.containerForm}>
            <Image
              source={require("../../../resources/images/riTimeFill.png")}
            />
            <Text style={styles.textTitle2}>{time}</Text>
          </View>
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
              style={[styles.caja1]}
              onPress={onPressOpenNavigationApps}
            >
              <Text style={[styles.textBoxCaja]}>¿Cómo llegar?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const PointListResult = (props) => {
  const { dataPointFilter, dataMapeoState } = useContext(IOMContext);

  const onPressOpenPoint = (id) => {
    props.navigation.navigate("PointItem", { id });
  };

  const onPressSeeAll = () => {
    props.navigation.navigate("PointListResultList");
  };

  const mapMarkers = () => {
    if (dataPointFilter != null) {
      return dataPointFilter.map((item, index) => {
        if (item.Coordenadas !== "") {
          var icon = (dataMapeoState.find((state) => state.id_estado == item.Estado_id));
          let coor = item.Coordenadas.split(",");
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(coor[0]),
                longitude: parseFloat(coor[1]),
              }}
              onPress={() => onPressOpenPoint(item.ID)}
            >
            <Image style={{height: 40, width: 28 }} source={{uri: icon?.img_estado_b64}} />
            </Marker>
          );
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos de servicio" />
        <LastUpdate {...props} />
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={StyleSheet.absoluteFillObject}>
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
          >
            {dataPointFilter !== null && mapMarkers()}
          </MapView>
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.overlay2} onPress={onPressSeeAll}>
              <Image
                source={require("../../../resources/images/riListCheck.png")}
              />
              <Text style={styles.textFilter}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", bottom: metrics.HEIGHT * 0.028 }}>
            <FlatList
              horizontal
              data={dataPointFilter}
              renderItem={({ item }) => (
                <ItemCardPoint {...props} item={item} />
              )}
              keyExtractor={(item) => item.ID}
            />
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
    flex: Platform.OS === "ios" ? 6.2 : 7.3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    //marginTop: 16,
  },
  overlay3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    maxWidth: 340,
    marginHorizontal: 5,
  },
  overlay4: {
    flexDirection: "row",
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
    paddingBottom: 10,
  },
  containerForm: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: 18,
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
    marginStart: 10,
  },
  caja2: {
    backgroundColor: "#132A3E",
  },
  textBoxCaja: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0125,
    color: "#132A3E",
  },
  textBoxCajaNegra: {
    color: "#FFFFFF",
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
  overlay: {
    position: "absolute",
    flexDirection: "row",
    bottom: Platform.OS === "ios" ? metrics.HEIGHT * 0.27 : metrics.HEIGHT * 0.33 ,
    height: metrics.HEIGHT * 0.057,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingEnd: 16,
  },
  overlay2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 123,
    padding: 10,
  },
  textFilter: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 16,
    color: "#003031",
    letterSpacing: 0.0125,
    marginLeft: 5,
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
});

export default PointListResult;
