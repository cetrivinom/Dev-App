import { identity } from "lodash";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  TextInput,
} from "react-native";

export const ItemMain = (props) => {
  const { item = "" } = props;
  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => {
        props.setSearchTerm(item);
        props.onClose();
      }}
    >
      <Text style={styles.cardItemText}>{item}</Text>
    </TouchableOpacity>
  );
};

const ModalFilter = ({
  show,
  onClose,
  data,
  setSearchTerm,
  placeholder = "Buscar tipo de contenido",
  toggleModal,
  departamento,
  openStatus
}) => {
  const [searchFilter, setSearchFilter] = useState("");
  const awesomeChildListRenderItem = (item) => (
      <ItemMain
        item={item.item}
        setSearchTerm={setSearchTerm}
        onClose={onClose}
      />
    );
  const awesomeChildListKeyExtractor = (item, index) => index;
  useEffect(() => {
    setSearchFilter("");

  }, [show]);

  if (data === null) {
    return null;
  }
 
  var dataFilter;
  if (openStatus == "municipio" && departamento !== null && departamento !== "" ) {
    dataFilter = [...new Set(
      data.filter((item) => item.Departamento==departamento).map((item) => item.Municipio)),];
      dataFilter = dataFilter.filter((item) =>
      item.toLowerCase().includes(searchFilter.toLowerCase()));
  } else if (openStatus == "municipio" && (departamento == null || departamento=="")) {
    dataFilter = [];
  }

  else {
    dataFilter = data.filter((item) =>
      item.toLowerCase().includes(searchFilter.toLowerCase()));
  }


  /*const dataFilter = data.filter((item) =>
    item.toLowerCase().includes(searchFilter.toLowerCase())
  );*/

  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        closeOnClick={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!show);
        }}
      >
        <TouchableHighlight style={styles.background} onPress={toggleModal} underlayColor={"transparent"}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.cardItemBuscar}
                placeholder={placeholder}
                onChangeText={(e) => {
                  setSearchFilter(e);
                }}
              />
              <View style={styles.divider}></View>
              <FlatList
                data={dataFilter}
                renderItem={awesomeChildListRenderItem}
                keyExtractor={awesomeChildListKeyExtractor}
              />
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: 325,
    height: 491,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    //padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  cardItem: {
    height: 47,
    justifyContent: "center",
  },
  cardItemText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#003031",
    lineHeight: 23,
    letterSpacing: 0.0015,
    marginStart: 12,
  },
  cardItemBuscar: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#A1AAB2",
    lineHeight: 22,
    letterSpacing: 0.005,
    marginStart: 12,
    height: 55,
  },
  divider: {
    height: 3,
    backgroundColor: "#E7EAEC",
    borderWidth: 1,
    borderColor: "#E7EAEC",
  },
});

export default ModalFilter;
