import React, { useContext, useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet, BackHandler, ScrollView, Pressable } from "react-native";
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
import { ItemMainLarge } from "./_children/CardLarge";
import moment from "moment";
import { Modal, TextInput } from "react-native-paper";
import Question from "./_children/Question";
const Main = (props) => {
  const { navigation } = props;
  const { user, config, createFavoriteArray, deleteFavoriteF, createFavoriteF, createCoordenadas, updateUserDate, createAnalytics, getCuestionario } = useContext(AuthContext);
  const [dataFirebase, setDataFirebase] = useState([]);
  const { getDataEnlace } = useContext(IOMContext);
  const { getDataSocio } = useContext(IOMContext);
  const { getDataLink } = useContext(IOMContext);
  const { getDataDirectory, getDataByDepartId } = useContext(IOMContext);
  const [formulario, setFormulario] = useState({});
  const [modalVisible, setModalVisible] = useState(true);
  const [current, setCurrent] = useState(0)
  const [actual, setActual] = useState("")
  const [complete, setComplete] = useState(false)
  const [preguntasForm, setPreguntasForm] = useState([])
  const [answersArray, setAnswersArray] = useState([])
  useEffect(() => {

    getCuestionarioU();
    getDataLink();
    getDataEnlace();
    getDataSocio();
    getDataDirectory("");
    sincronizarCoordenadas();
    actualizarFecha();
    guardarLogAnalytics()

  }, []);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {


        getDataFirebase()

        sincronizarFirebaseToStorage();



      }
    })
  }, [])

  function validarFechaEnRango(fechaInicio, fechaFin, fechaValidar) {

    const fechaInicioMs = fechaInicio.getTime();
    const fechaFinMs = fechaFin.getTime();
    const fechaValidarMs = fechaValidar.getTime();

    if (fechaValidarMs >= fechaInicioMs && fechaValidarMs <= fechaFinMs) {
      return true;
    } else {
      return false;
    }

  }

  const getCuestionarioU = async () => {



    getCuestionario().then((cuestionario) => {


      let active_questionnaire = cuestionario.questionnaire.filter(item => item.active === true)

      let preguntasForm2 = cuestionario.questions

      if (active_questionnaire !== undefined) {



        let first_active_questionnaire = active_questionnaire[0];

        let id = first_active_questionnaire.id;
        let date_i = new Date(first_active_questionnaire.date_i);
        let date_f = new Date(first_active_questionnaire.date_f);
        let repeticiones = first_active_questionnaire.repetitions;
        let interval = first_active_questionnaire.validation_interval;
        setActual(id)

        let fecha_hoy = new Date();

        let validarFecha = validarFechaEnRango(date_i, date_f, fecha_hoy)

        if (validarFecha) {


          let arrayQ = {
            id: id,
            descripcion: first_active_questionnaire.descripcion,
            date_f: date_f,
            date_i: date_i,
            repeticiones: repeticiones,
            interval: interval,
            preguntas: first_active_questionnaire.questions

          }

          validar(arrayQ, preguntasForm2)

        } else {
          setComplete(true)
        }




      }

    })






  }

  const validar = (arrayQ, preguntasForm2) => {




    let flag = false;

    database()
      .ref("respuestas/" + user.uid + "/" + arrayQ.id + "/")
      .once("value", (snapshot) => {
        if (snapshot.hasChildren()) {



          let repeticiones = arrayQ.repeticiones;

          let array_resp = []
          Object.keys(snapshot.val()).forEach(element2 => {

            let element = snapshot.val()[element2]


            let fecha = new Date(element.fecha);

            let validar = validarFechaEnRango(arrayQ.date_i, arrayQ.date_f, fecha)

            if (validar) {

              let obje = {
                fecha: fecha
              }

              array_resp.push(obje);


            }


          });


          if (array_resp.length < arrayQ.repeticiones) {

            let dataSort =
              array_resp.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

            let fechaActual = new Date();

            let ultimoRegistroF = dataSort[0].fecha


            let diferenciaFecha = Math.floor((fechaActual - ultimoRegistroF) / (1000 * 60 * 60 * 24))


            if (diferenciaFecha >= arrayQ.interval) {
              llenarFormulario(arrayQ, preguntasForm2)
            } else {
              setComplete(true)
            }


          }
          else {
            setComplete(true)
          }




        } else {
          llenarFormulario(arrayQ, preguntasForm2)

        }

      })


  }

  const llenarFormulario = (arrayQ, preguntasForm2) => {



    let preguntas = []
    arrayQ.preguntas.forEach(element => {

      let pregunta = preguntasForm2.find(item => item.id === element)

      preguntas.push(pregunta)

    });
    let formulario = {
      id: arrayQ.id,
      descripcion: arrayQ.descripcion,
      preguntas: preguntas
    }


    setFormulario(formulario);

  }

  const sincronizarCoordenadas = async () => {

    if (user !== null && user !== undefined) {


      const value = await AsyncStorage.getItem("coordenadas");

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

  const actualizarFecha = () => {
    if (user !== null && user !== undefined) {
      updateUserDate(user);
    }

  }

  const guardarLogAnalytics = (nombre) => {

    if (user !== null && user !== undefined) {


      var array = {
        fecha: moment().format('DD/MM/YY, HH:mm:ss'),
        evento: "ingreso",
        value: user.email
      }

      createAnalytics(user, array)


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


  const onSubmit = (answer) => {

    let ultima = current === formulario.preguntas.length - 1 ? true : false

    const question = formulario.preguntas[current];
    let fecha = moment().format('YYYY-MM-DD');


    let a = {
      q: question.enunciado,
      fecha: fecha,
      a: answer
    }

    setAnswersArray(currentA => [...currentA, a]);



    if (ultima) {

      setCurrent(current + 1)
      setComplete(current === formulario.preguntas.length - 1 ? true : false)

      let arrayFinal = [];

      answersArray.forEach(element => {

        arrayFinal.push(element)


      });
      arrayFinal.push(a)

      let dataToSave = {
        fecha: fecha,
        answers: arrayFinal
      }

      database()
        .ref("respuestas/" + user.uid + "/" + actual + "/")
        .push(dataToSave)
        .then((value) => {

          setCurrent(current + 1)
          setComplete(current === formulario.preguntas.length - 1 ? true : false)

        })
        .catch((error) => {
          console.error(error);
        });


    }

    setCurrent(current + 1)

    setComplete(current === formulario.preguntas.length - 1 ? true : false)


  }


  return (
    <View style={{ flex: 1 }}>


      <HeaderHome />

      {complete === true && (

        <View style={{ flex: 3, }} >
          <View style={{ flex: 1, }}>
            <Text style={styles.labelTitle}>¡Te damos la bienvenida!</Text>
            <Text style={styles.labelDescripcion}>
              Queremos brindarte la mejor ayuda, por eso hemos preparado las siguientes funciones para ti:
            </Text>
          </View>

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
          <View style={styles.containerForm}>
            <ItemMain
              {...props}
              name="LinksStack"
              title="Enlaces de interes"
              image="3"
            />
            <ItemMain
              {...props}
              name="FavoritesStack"
              title="Puntos guardados"
              image="4"
            />
          </View>
          <View style={styles.containerForm}>
            <ItemMainLarge
              {...props}
              name="IntegracionStack"
              title="Información para el empleo y el emprendimiento"
              image="6"
            />
          </View>
          <View style={styles.containerFooter}>
            <LastUpdate />
          </View>
        </View>

      )}


      {formulario && formulario.preguntas && formulario.preguntas.length > 0 && !complete && (

        <View style={{ flex: 2, marginTop: 20 }} >

          <View >

            <Text style={styles.labelDescripcionForm}>{formulario.descripcion}</Text>
          </View>
          <View style={styles.containerForm2}>

            {formulario && formulario.preguntas && formulario.preguntas.length > 0 && (

              <Question
                onSubmit={onSubmit}
                question={formulario?.preguntas[current]}
                current={current}
              />

            )}
          </View>
        </View>

      )}


    </View>
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
    flex: 1,
  },
  containerForm2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flex: 1,
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
    fontSize: 14,
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginRight: 19,
    marginLeft: 13,
    textAlign: "center",
    fontFamily: 'Dosis-Regular',
  },
  labelDescripcionForm: {
    fontSize: 16,
    color: "#425565",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginRight: 19,
    marginLeft: 13,
    textAlign: "center",
    fontFamily: 'Dosis-Regular',
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
    width: metrics.WIDTH,
    marginBottom: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: metrics.WIDTH,
    borderWidth: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    padding: 2,
    width: "100%"
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Main;
