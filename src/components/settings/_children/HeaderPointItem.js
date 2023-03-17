import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import IOMContext from "../../../../context/iomData/iomContext";
import AuthContext from "../../../../context/auth/authContext";
import database from "@react-native-firebase/database";
import analytics from '@react-native-firebase/analytics';


const HeaderPointItem = (props) => {
  const { id = "", nombre = "" } = props || {};
  const { createFavorite, dataFavorite, deleteFavoriteId } = useContext(IOMContext);
  const { user, getUser, deleteFavoriteF, createFavoriteF } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorito, setFavorito] = useState({});

  
  const onPressSave = () => {
    if (isFavorite) {

      deleteFavoriteF(user, id);

    } else {

      let nombreA = nombre.replace(/ /g, "_") + "|Crear_Favorito";

      console.log(nombreA)

      analytics().logScreenView({
        screen_name: nombreA,
        screen_class: nombreA,
      });


      createFavoriteF(user, id);

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

          if (a !== undefined && a.length !== 0) {
            setFavorito(a)
            setIsFavorite(true)
          }
          else {
            setIsFavorite(false)
          }

        }
      })


  }

  return (


    <View style={styles.containerFormTitle}>
      <Text style={styles.textTitle}>{nombre}</Text>
      <TouchableOpacity onPress={onPressSave}>
        
          <Image
            source={isFavorite ? require("../../../resources/images/riBookmarkLine2.png") : require("../../../resources/images/riBookmarkLine.png")}
          />
        
      </TouchableOpacity>
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
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0.0015,
    fontFamily:'Dosis-Bold',
    color: "#003031",
    textTransform:'capitalize',
    width:metrics.WIDTH*0.8
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
  containerFormTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});

export default HeaderPointItem;
