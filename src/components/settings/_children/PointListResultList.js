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
  Linking
} from "react-native";
import IOMContext from "../../../../context/iomData/iomContext";
import HeaderItem from "../../global/_children/HeaderItem";
import { metrics } from "../../../utilities/Metrics";
import { SvgCssUri } from 'react-native-svg';
import _ from 'lodash';
import HeaderPoint from "../../global/_children/HeaderPointFil";
import analytics from '@react-native-firebase/analytics';
import HeaderPointItem from "./HeaderPointItem";

export const LastUpdate = ({ route, navigation }) => {
  const {
    departamento = "",
    municipio = "",
    statusPoint = "",
    tipoUbicacion = "",
  } = route.params || {};
  const onPressClose = () => {
    navigation.navigate("FilterSetting");
  };

  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerFormHeader}>
        <View style={styles.containerFormHeader2}>
          <Image
            source={require("../../../resources/images/riMapPinLine2.png")}
          />
          <Text style={styles.textTitle2}>
            {departamento + "/" + municipio + "/" + statusPoint + "/" + tipoUbicacion}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressClose}>
          <Text style={styles.labelTitle2}>Volver a filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const militaryTimeTo12Hour = (s) => {

   

  if(s.toString().length == 4) s = `${s.toString()}`; // 930 -> 0930
  if(s.toString().length == 3) s = `0${s.toString()}`; // 930 -> 0930
  if(s.toString().length == 1) s = `000${s.toString()}`; // 930 -> 0930

  const hour = parseInt(s.toString().substring(0, 2), 10);
  const min = s.toString().substring(2, 4);
  if(hour < 12) return `${hour % 12}:${min} AM`;
  return `${hour % 12 || 12}:${min} PM`;
}

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
    Tipo_ubicacion="",
    Horario = []
  } = props.item || {};

  let lunesAViernes = [];
  let sabadoDomingo = [];

  
  if(Array.isArray(Horario)){

    Horario?.map((i, index) => {
      if (i.day !== 0 && i.day != 6) {
        let dato = {}
        dato.id = index + 1;
        dato.day = i.day === 0 ? "Domingo" : i.day === 1 ? "Lunes" : i.day === 2 ?
          "Martes" : i.day === 3 ? "Miercoles" : i.day === 4 ? "Jueves" : i.day === 5 ?
            "Viernes" : "Sabado";
        dato.endhours = i.endhours !== null ? militaryTimeTo12Hour(i.endhours) : i.comment;
        dato.starthours = i.starthours !== null ? militaryTimeTo12Hour(i.starthours) : "";
        lunesAViernes.push(dato);
      }

    })
  }else{
    let j = 0;
    for (let key in Horario) { 

      if (Horario[key].day !== 0 && Horario[key].day != 6) {
        let dato = {}
        dato.id = j + 1;
        dato.day = Horario[key].day === 0 ? "Domingo" : Horario[key].day === 1 ? "Lunes" : Horario[key].day === 2 ?
          "Martes" : Horario[key].day === 3 ? "Miercoles" : Horario[key].day === 4 ? "Jueves" : Horario[key].day === 5 ?
            "Viernes" : "Sabado";
        dato.endhours = Horario[key].endhours !== null ? militaryTimeTo12Hour(Horario[key].endhours) : Horario[key].comment;
        dato.starthours = Horario[key].starthours !== null ? militaryTimeTo12Hour(Horario[key].starthours) : "";
        lunesAViernes.push(dato);

    }
  }
}
  
if(Array.isArray(Horario)){

  Horario?.map((i, index) => {
    if (i.day === 0 || i.day === 6) {
      let dato = {}
      dato.id = index + 1;
      dato.day = i.day === 0 ? "Domingo" : i.day === 1 ? "Lunes" : i.day === 2 ?
        "Martes" : i.day === 3 ? "Miercoles" : i.day === 4 ? "Jueves" : i.day === 5 ?
          "Viernes" : "Sabado";
      dato.endhours = i.endhours !== null ? militaryTimeTo12Hour(i.endhours) : i.comment;
      dato.starthours = i.starthours !== null ? militaryTimeTo12Hour(i.starthours) : "";
      sabadoDomingo.push(dato);
    }

  })
}else{
  let j = 0;
  for (let key in Horario) { 

    if (Horario[key].day === 0 || Horario[key].day === 6) {
      let dato = {}
      dato.id = j + 1;
      dato.day = Horario[key].day === 0 ? "Domingo" : Horario[key].day === 1 ? "Lunes" : Horario[key].day === 2 ?
        "Martes" : Horario[key].day === 3 ? "Miercoles" : Horario[key].day === 4 ? "Jueves" : Horario[key].day === 5 ?
          "Viernes" : "Sabado";
      dato.endhours = Horario[key].endhours !== null ? militaryTimeTo12Hour(Horario[key].endhours) : Horario[key].comment;
      dato.starthours = Horario[key].starthours !== null ? militaryTimeTo12Hour(Horario[key].starthours) : "";
      sabadoDomingo.push(dato);
    }

  }
}



  let timeLV = lunesAViernes.reduce((groups, groupDay) => {


    const openingtime = groupDay.starthours + " - " + groupDay.endhours;
    const openingTimeIncludedInAGroup = groups.find(singleDay =>
      singleDay.hours === openingtime)


    const id = openingTimeIncludedInAGroup && openingTimeIncludedInAGroup.id

    if (id) {
      return groups.map(item => item.id === id
        ? { ...item, days: item.days.concat(groupDay.day) }
        : item)
    }

    return groups.concat({
      id: Math.random(),
      hours: openingtime,
      days: [groupDay.day]
    })


  }, [])



  let timeSD = sabadoDomingo.reduce((groups, groupDay) => {


    const openingtime = groupDay.starthours + " - " + groupDay.endhours;
    const openingTimeIncludedInAGroup = groups.find(singleDay =>
      singleDay.hours === openingtime)


    const id = openingTimeIncludedInAGroup && openingTimeIncludedInAGroup.id

    if (id) {
      return groups.map(item => item.id === id
        ? { ...item, days: item.days.concat(groupDay.day) }
        : item)
    }

    return groups.concat({
      id: Math.random(),
      hours: openingtime,
      days: [groupDay.day]
    })


  }, [])


  const { dataMapeoService, getDataMapeoService, dataMapeoState } = useContext(IOMContext);
  let _Nombre_punto = Nombre_punto.substring(0, 80);  
  const unique = [...new Set(Servicios.map(item => item.Servicio_id))];


  const onPressOpenPoint = (id, nombre) => {

    let nombreA = nombre.replace(/ /g, "_")+"|Mapeo_De_Servicios_Colombia_GIFMM";


    analytics().logScreenView({
      screen_name: nombreA,
      screen_class: nombreA,
    });
    
    let coor = Coordenadas.split(",");
    let latitude = parseFloat(coor[0]);
    let longitude = parseFloat(coor[1]);
    let icon = (dataMapeoState.find((state) => state.id_estado == Estado_id));
    let uri = icon?.img_estado_b64;
    props.navigation.navigate("PointItem", { id, latitude, longitude, uri, from:"SettingsStack"});
  };

  const onPressOpenNavigationApps = () => {
    let coor = Coordenadas.split(",");
    let latitude = parseFloat(coor[0]);
    let longitude = parseFloat(coor[1]);
    const scheme = Platform.select({ ios: 'http://maps.apple.com/?q='+_Nombre_punto+'&ll=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = _Nombre_punto;
    const url = Platform.select({
      ios: `${scheme}${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);  
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
      <HeaderPointItem id={id}  nombre={_Nombre_punto}/>
          

      <View style={{flex : 1, flexDirection:'row'}}>
        <View style={{flex:0.6}}>
          <View style={styles.containerForm}>{_.map(services,(val) => {
            return val.svg
          })}</View>
          <View style={styles.containerForm}>
            <Image source={require("../../../resources/images/riMapPinFill.png")} />
            <Text numberOfLines={1} style={styles.textTitle2}>{Estado}</Text>
          </View>
        </View>
        <View style={{flex:0.4, alignItems:'flex-end'}}>
          <View style={styles.box7}>
            <TouchableOpacity
              style={[styles.caja1, styles.caja2]}
              onPress={() => onPressOpenPoint(id, Nombre_punto)}
            >
              <Text style={[styles.textBoxCaja, styles.textBoxCajaNegra]}>
                Conocer más
              </Text>
            </TouchableOpacity>
            {Coordenadas !== "" &&
              <TouchableOpacity
                style={[styles.caja1]}
                onPress={onPressOpenNavigationApps}
              >
                <Text style={[styles.textBoxCaja]}>¿Cómo llegar?</Text>
              </TouchableOpacity>
            }
            
          </View>

        </View>
      </View>

      {timeLV && timeLV.map(group => (
              <View style={styles.containerForm} key={group.id}>
                <Image
                  source={require("../../../resources/images/riTimeFill.png")}
                />
                <Text style={styles.textTitle2}>{group.days.length === 1
                  ? group.days
                  : group.days[0] + " - " + group.days[group.days.length - 1]}: {group.hours}</Text>
              </View>
            ))}
            {timeSD && timeSD.map(group => (
              <View style={styles.containerForm} key={group.id}>
                <Image
                  source={require("../../../resources/images/riTimeFill.png")}
                />
                <Text style={styles.textTitle2}>{group.days.length === 1
                  ? group.days
                  : group.days[0] + " - " + group.days[group.days.length - 1]}: {group.hours}</Text>
              </View>
            ))}
        <View style={styles.containerForm}>
          <Text style={styles.textTitle2}>Tipo de ubicación: {Tipo_ubicacion}</Text>
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
        <HeaderPoint {...props} title="Puntos de servicio" />
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

   box1: {
    flex: 0.15,
  },
  //content
  box2: {
    flex: 0.85,
    backgroundColor: "#FFFFFF",
  },
  containerHeader: {
    flex:1,
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
    color: "#902857",
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
    fontSize: 10,
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
