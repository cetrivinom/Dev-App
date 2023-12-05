import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { metrics } from "../../../utilities/Metrics";
import IOMContext from "../../../../context/iomData/iomContext";
import AuthContext from "../../../../context/auth/authContext";
import database from "@react-native-firebase/database";
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
const HeaderPointItem = (props) => {
  const { title = "", id = "", showSaveOpt = true, navigation, nombre="", from="" } = props || {};
  const { createFavorite, dataFavorite, deleteFavoriteId } = useContext(IOMContext);
  const {user,  getUser, deleteFavoriteF, createFavoriteF } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
const [favorito, setFavorito] = useState({});

  const onPressClose = () => {
    if(from==="Favorites"){
      navigation.navigate(from)
    }else{
      navigation.goBack();
    }
    
  };
  const onPressSave = () => {
    if (isFavorite) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
      deleteFavoriteF(user,id);
        }});
      deleteFavoriteId(id)
    }else{

      let nombreA = nombre.replace(/ /g, "_") + "|Crear_Favorito";

   
      analytics().logScreenView({
        screen_name: nombreA,
        screen_class: nombreA,
      });

      NetInfo.fetch().then(state => {
        if (state.isConnected) {
      createFavoriteF(user,id);
        }})
      storeData(id);
      
    }
    setIsFavorite(!isFavorite);
  };

  const storeData = async (id) => {

    let item = {
      id: id
    };
    
    var value = JSON.parse(await AsyncStorage.getItem("favorites"));
      if (!value)
        value = [];
      let index = value.findIndex(favorite => favorite.id == item.id);
      if (index == -1 && item.id >= 0) {
        value.push(item);
        AsyncStorage.setItem("favorites", JSON.stringify(value));
        
      }
  }

  useEffect(() => {
    setInformacion()
  }, [])

  const setInformacion = async () => {

    const value = await AsyncStorage.getItem('favorites');
    
        if (value !== null) {
          
          var favoritosL = JSON.parse(value);
          let a = favoritosL.find(item => item.id === id);

          if (a !== undefined && a.length !== 0) {
            setFavorito(a)
            setIsFavorite(true)
          }

        }


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
