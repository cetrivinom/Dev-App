import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import Header from "../global/_children/HeaderBack";
import CardItemDirectory from "./_children/CardItemDirectory";
import IOMContext from "../../../context/iomData/iomContext";

import moment from "moment";
import AuthContext from "../../../context/auth/authContext";
/**
 * Componente que construye el Directorio, hace el llamado al action que devuelve la informacion del API
 * @param {Object} this.props - objeto de propiedades heredados de la clase padre.
 * @return {Object} <View /> Directorio de lineas telefonicas
 */
const Directory = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dataDirectory, getDataDirectory } = useContext(IOMContext);
  const awesomeChildListRenderItem = (item,index) => (<CardItemDirectory {...props} key={item.item.departamento} title={item.item.departamento} icon={item.item.icon} dataDirectory= {dataDirectory} />)
  const awesomeChildListKeyExtractor = (item) => item.departamento;
  const { user,createAnalytics } = useContext(AuthContext);
  useEffect(() => {


    guardarLogAnalytics("lineas_telefonicas")

    getDataDirectory(searchTerm);
  }, [searchTerm]);

  const guardarLogAnalytics = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha: moment().format('DD/MM/YY, HH:mm:ss'),
        evento: "ingreso_modulo",
        value: nombre
      }

      createAnalytics(user, array)


    }


  }

  const compareObjects = (object1, object2, key) => {
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0;
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={true} title="Lineas telefónicas" from="Directory"/>
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.containerSearch}>
          <TextInput
            style={styles.inputTextBox}
            onChangeText={(e) => setSearchTerm(e)}
            placeholderTextColor="#a9a9a9"
            placeholder="Buscar departamento o servicio"
          />
        </View>
        {dataDirectory != null && (
          <FlatList
            data={dataDirectory.sort(function(a,b) {
              return compareObjects(a, b, 'departamento')
            })}
            renderItem={awesomeChildListRenderItem}
            keyExtractor={awesomeChildListKeyExtractor}
          />
        )}
      </View>
    </View>
  );
};
/**
 * Hoja de estilos aplicadas a Directory
 */
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
    marginHorizontal: 15,
  },
  containerSearch: {
    //marginVertical: 30,
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginBottom: 10,
  },
  inputTextBox: {
    height: 46,
    borderColor: "#E7EAEC",
    backgroundColor: "#E7EAEC",
    borderRadius: 25,
    borderWidth: 1,
    paddingLeft: 15,
    color: "#000",
  },
});

export default Directory;
