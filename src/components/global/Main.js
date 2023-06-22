import React, { useContext, useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet, BackHandler, ScrollView } from "react-native";
import { ItemMain } from "./_children/Card";
import LastUpdate from "./_children/LastUpdate";
import HeaderHome from "./_children/HeaderHome";
import AuthContext from "../../../context/auth/authContext";
import IOMContext from "../../../context/iomData/iomContext";
import { metrics } from "../../utilities/Metrics";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import { useState } from "react";
const Main = (props) => {
  const { navigation } = props;
  const { user, config, createFavoriteArray, deleteFavoriteF, createFavoriteF, createCoordenadas, updateUserDate } = useContext(AuthContext);
  const [dataFirebase, setDataFirebase] = useState([]);
  const { getDataEnlace } = useContext(IOMContext);
  const { getDataSocio } = useContext(IOMContext);
  const { getDataLink } = useContext(IOMContext);
  const { getDataDirectory, getDataByDepartId } = useContext(IOMContext);

  useEffect(() => {

    getDataLink();
    getDataEnlace();
    getDataSocio();
    getDataDirectory("");
    sincronizarCoordenadas();
    actualizarFecha();

  }, []);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {


        getDataFirebase()

        sincronizarFirebaseToStorage();



      }
    })
  }, [])

  const sincronizarCoordenadas = async () => {

    if (user !== null && user !== undefined) {


      const value = await AsyncStorage.getItem("coordenadas");
      console.log(value)

      var coordenadasL = JSON.parse(value);

      var count = Object.keys(coordenadasL).length;

      if (count > 0) {
        coordenadasL.forEach(obj => {


          
          createCoordenadas(user, obj);

        });
      }



      await AsyncStorage.removeItem("coordenadas");

    }

  }

  const actualizarFecha = () =>{
    if (user !== null && user !== undefined) {
    updateUserDate(user);
    }

  }


  const sincronizarFirebaseToStorage = async () => {

    database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;

          var array = [];
          dataF && dataF.forEach((child) => {
            var a = {}
            a.id = child.val().id;
            array.push(a);

          });

          storeData(array)

        }
      })


  }

  const sincronizarFirebaseToStorage2 = async () => {

    database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;

          var array = [];
          dataF && dataF.forEach((child) => {
            var a = {}
            a.id = child.val().id;
            array.push(a);

          });

          storeData2(array)

        }
      })


  }

  const getDataFirebase = async () => {

    var array = [];
    database()
      .ref("/favorites/" + user.uid)
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {
          let dataF = snapshot;


          dataF && dataF.forEach((child) => {
            var a = {}
            a.id = child.val().id;
            array.push(a)
          });

          setDataFirebase(array)


        }


      })
  }

  const sincronizarStorageToFirebase = async (array) => {





    const value = await AsyncStorage.getItem('favorites');



    var favoritosL = JSON.parse(value);
    var count = Object.keys(favoritosL).length;
    var count_firebase = array.length;

    console.log("count favo", count)
    console.log("count_firebase", count_firebase)


    if (count > 0 && count_firebase === 0) {
      favoritosL.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {

          createFavoriteArray(user, value);
        });

      });
    }

    if (count === 0 && count_firebase > 0) {

      sincronizarFirebaseToStorage2()
    }

    if (count > 0 && count_firebase > 0) {

      if (count > count_firebase) {

        favoritosL.forEach(obj => {
          Object.entries(obj).forEach(([key, value]) => {
            let a = array.find(item => item.id === value);
            if (a === undefined) {
              createFavoriteF(user, value);
            }
          });

        });

      } else {

        array && array.forEach(sto => {

          let a = favoritosL.find(item => item.id === sto.id);

          if (a === undefined) {
            deleteFavoriteF(user, sto.id);
          }


        });

      }



    }






  }

  const storeData = async (item) => {


    var value = JSON.parse(await AsyncStorage.getItem("favorites"));
    if (!value) {


      AsyncStorage.setItem("favorites", JSON.stringify(item));

    } else {
      console.log("dataFirebase", item)
      sincronizarStorageToFirebase(item);
    }



  }

  const storeData2 = async (item) => {




    AsyncStorage.setItem("favorites", JSON.stringify(item));





  }

  useEffect(() => {


    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.navigate("Splash")

  }



  return (
    <ScrollView style={styles.container}>

      <View style={{ height: metrics.HEIGHT * 0.30, width: metrics.WIDTH }}>
        <HeaderHome />
      </View>
      <View style={{ height: metrics.HEIGHT * 0.70, width: metrics.WIDTH }}>
        <Text style={styles.labelTitle}>¡Te damos la bienvenida!</Text>
        <Text style={styles.labelDescripcion}>
          Queremos brindarte la mejor ayuda, por eso hemos preparado las
          siguientes funciones para ti:
        </Text>
        <View style={styles.containerForm}>
          <ItemMain
            {...props}
            name="SettingsStack"
            title="Puntos de servicio"
            image="1"
          />
          <ItemMain
            {...props}
            name="DirectoryStack"
            title="Líneas Telefónicas"
            image="2"
          />
        </View>
        <View style={styles.containerForm2}>
          <ItemMain
            {...props}
            name="LinksStack"
            title="Contenido de interés"
            image="3"
          />
          <ItemMain
            {...props}
            name="FavoritesStack"
            title="Puntos guardados"
            image="4"
          />
          {!config.anonymousAuth && (
            <ItemMain
              {...props}
              name="ProfileStack"
              title="Mi Perfil"
              image="5"
            />
          )}

        </View>

      </View>
      <View style={styles.containerFooter}>
        <LastUpdate />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: metrics.HEIGHT,
    width: metrics.WIDTH

  },
  containerForm: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: metrics.HEIGHT * 0.12,
    marginTop: metrics.HEIGHT * 0.05
  },
  containerForm2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: metrics.HEIGHT * 0.15,
    marginTop: metrics.HEIGHT * 0.05,
    marginBottom: 10
  },
  labelTitle: {
    fontSize: 27,
    fontWeight: "bold",
    lineHeight: 34,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#007681",
    marginTop: metrics.HEIGHT * 0.05,
    fontFamily: 'Dosis-Regular'
  },
  labelDescripcion: {
    fontSize: 15,
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginRight: 19,
    marginLeft: 13,
    textAlign: "center",
  },
  image: {
    flex: 1,
    borderWidth: 1
  },
  logo: {
    top: 25,
    width: 263,
    height: 140,
    resizeMode: "contain",
  },
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    letft: 0,
    right: 0,
    width: metrics.WIDTH,
    height: metrics.HEIGHT * 0.05
  },
});

export default Main;
