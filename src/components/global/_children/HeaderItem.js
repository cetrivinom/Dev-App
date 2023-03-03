import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import IOMContext from "../../../../context/iomData/iomContext";
import AuthContext from "../../../../context/auth/authContext";
import database from "@react-native-firebase/database";
import analytics from '@react-native-firebase/analytics';


const HeaderItem = (props) => {
  const { title = "", id = "", showSaveOpt = true, navigation, nombre="" } = props || {};
  const { createFavorite, dataFavorite, deleteFavoriteId } = useContext(IOMContext);
  const {user,  getUser, deleteFavoriteF, createFavoriteF } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
const [favorito, setFavorito] = useState({});

  const onPressClose = () => {
    navigation.navigate("SettingsStack")
  };
  const onPressSave = () => {
    if (isFavorite) {

      deleteFavoriteF(user,favorito);
      
    }else{

      let nombreA = nombre.replace(/ /g, "_") + "|Crear_Favorito";

      console.log(nombreA)

      analytics().logScreenView({
        screen_name: nombreA,
        screen_class: nombreA,
      });


      createFavoriteF(user,id);
      
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    setInformacion()
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

          let a = array.find(item => item.id === id);

          if(a!==undefined && a.length!==0){
            setFavorito(a)
            setIsFavorite(true)
          }
          else{
            setIsFavorite(false)
          }
          
        }
      })


  }

  return (
    <View style={[styles.box, styles.box1]}>
      <View style={styles.statusBarBackground}>
      </View>
      <View style={styles.boxImage}>
        <Image source={require("../../../resources/images/linkIcon.png")} />
      </View>
      <View style={styles.box4}>
        <TouchableOpacity onPress={onPressClose}>
          <Image
            source={require("../../../resources/images/riCloseLine.png")}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{title}</Text>
        <TouchableOpacity onPress={onPressSave}>
          {showSaveOpt && (
            <Image
              source={isFavorite ? require("../../../resources/images/riBookmarkLine2.png") : require("../../../resources/images/riBookmarkLine.png")}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  //header
  box1: {
    flex: 1,
  },
  boxImage: {
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#003031",
    alignItems: 'center',
    //lineHeight: 28,
    letterSpacing: 0.0015,
  },
  box4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginBottom: 30,
  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.06 : 0,
    //backgroundColor: "#00AAAD",
  },
});

export default HeaderItem;
