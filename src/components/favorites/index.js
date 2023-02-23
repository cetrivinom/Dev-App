import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import Header from "../global/_children/Header";
import CardtemFavorite from "./_children/CardtemFavorite";
import IOMContext from "../../../context/iomData/iomContext";
import AsyncStorage from '@react-native-community/async-storage'
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import database from "@react-native-firebase/database";
import AuthContext from "../../../context/auth/authContext";
const { SlideInMenu } = renderers;

const Favorites = (props) => {

  const mountedRef = useRef(true);

  const { user, getUser, deleteFavoriteF, createFavoriteF } = useContext(AuthContext);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataFavoriteL, setDataFavoriteL] = useState([]);
  useEffect(() => {
    let loop = setInterval(() => {
      setInformacion();
    }, 1000);
    return () => clearInterval(loop);
  }, [])

  const setInformacion = async () => {


    await database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;
          let array = [];

          dataF && dataF.forEach((child) => {
            let data = {};
            data.id = child.val().id;
            data.k = child.key;
            array.push(data)
          });
          setDataFavorite(array);
          setDataFavoriteL(array);
        }
      })


  }

  const deleteItemById = k => {


    let a = (dataFavoriteL.filter(item => item.k === k));


    deleteFavoriteF(user, a[0]);
    setInformacion();
  }

  const awesomeChildListRenderItem = (item) => (
    <Menu style={styles.menu}>
      <CardtemFavorite {...props} id={item.item.id} />
      <MenuTrigger
        style={styles.trigger}>
        <Image source={require("../../resources/images/riMoreLine.png")} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ width: 100 }} customStyles={{ optionText: styles.text }}>
        <MenuOption onSelect={() => deleteItemById(item.item.k)} text='Borrar' />
      </MenuOptions>
    </Menu>
  );

  const awesomeChildListKeyExtractor = (item) => item.k;

  return (

    <MenuProvider skipInstanceCheck={true} style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} showBack={false} title="Puntos favoritos" />
      </View>
      {dataFavorite.length === 0 ?
        <View style={[styles.container]}>
          <ActivityIndicator size="large" />
        </View>
        : null}
      {dataFavoriteL && (
        <View style={[styles.box, styles.box2]}>
          <FlatList
            data={dataFavoriteL}
            renderItem={awesomeChildListRenderItem}
            keyExtractor={awesomeChildListKeyExtractor}
          />
        </View>
      )}
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    marginBottom: 15,
  },
  //header
  box1: {
    flex: 1,
  },
  //content
  box2: {
    flex: 10,
  },

  trigger: {
    //padding: 5,
    //margin: 25,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
  slideInOption: {
    padding: 5,
  },
  text: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontWeight: "bold",
    color: "#003031",
  },
  menu: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: "#E7EAEC"
  },
});

export default Favorites;
