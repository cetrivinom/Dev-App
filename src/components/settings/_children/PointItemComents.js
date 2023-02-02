/* eslint-disable react-native/no-inline-styles */
import React, { useContext,useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { metrics } from "../../../utilities/Metrics";
import AuthContext from "../../../../context/auth/authContext";
import IOMContext from "../../../../context/iomData/iomContext";

const PointItemComents = ({ route, navigation }) => {
  const { id = "", Nombre_punto = "" } = route.params || {};
  const { user,config } = useContext(AuthContext);
  const { createUserComment } = useContext(IOMContext);
  const [comment, setComment] = useState('');

  const onPressClose = () => {
    navigation.goBack();
  };

  const onPressPublic = () => {
    if(comment.length>1)
    createUserComment(user,id,comment,config);
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.statusBarBackground}>
      </View>
      <View style={[styles.box, styles.box1]}>
        <View style={styles.boxImage}>
          <Image source={require("../../../resources/images/linkIcon.png")} />
        </View>
        <View style={styles.box4}>
          <TouchableOpacity onPress={onPressClose}>
            <Image
              source={require("../../../resources/images/riCloseLine.png")}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>
            {Nombre_punto.substring(0, 18) + "..."}
          </Text>
          <TouchableOpacity onPress={onPressPublic}>
            <Text style={styles.textTitlePublicar}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <View style={styles.box5}>
          <View style={styles.cajaDireccion}>
            <View style={styles.containerForm}>
              <Image
                source={require("../../../resources/images/userIco.png")}
              />
              <Text style={styles.textTitle2}>{user.email}</Text>
            </View>
            <Text style={styles.textTitle3}>
              Nos interesa conocer tus opiniones y experiencias para mejorar,
              pero si tienes inquietudes o solicitudes particulares que
              necesitas resolver, te sugerimos que visites el punto de servicios
              más cercano o llames a una de las lineas de atención que se han
              dispuesto en esta aplicación para ti.
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.inputTextBox}
              placeholder="Describe tu experiencia en este lugar"
              onChangeText={(e) => setComment(e)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

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
    lineHeight: 28,
    letterSpacing: 0.0015,
  },
  textTitlePublicar: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#902857",
    lineHeight: 18,
    letterSpacing: 0.0125,
  },
  box4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginBottom: 30,
  },
  box5: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  divider: {
    height: 3,
    backgroundColor: "#E7EAEC",
    borderWidth: 1,
    borderColor: "#E7EAEC",
    marginBottom: 16,
  },
  caja1: {
    flexDirection: "row",
  },
  overlay: {
    height: 34,
    width: 130,
    backgroundColor: "#132A3E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  caja1Text: {
    width: 220,
    fontSize: 18,
    fontWeight: "bold",
    color: "#003031",
    lineHeight: 23,
    letterSpacing: 0.0015,
    alignSelf: "stretch",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
  },
  containerForm: {
    flexDirection: "row",
    marginBottom: 10,
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
  textTitle3: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 16,
    letterSpacing: 0.0025,
    color: "#A1AAB2",
    marginTop: 2,
    marginStart: 35,
    textAlign: "justify",
  },
  cajaDireccion: {
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginBottom: 10,
  },
  textDireccion: {
    fontSize: 15,
    fontWeight: "normal",
    lineHeight: 18,
    color: "#FFFFFF",
    letterSpacing: 0.0125,
  },
  textHorario: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    color: "#007681",
    letterSpacing: 0.0015,
    marginBottom: 8,
  },
  textComentario: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 23,
    color: "#003031",
    letterSpacing: 0.0015,
    marginBottom: 8,
  },
  textAgregarComentario: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#00AAAD",
    letterSpacing: 0.0125,
    marginStart: 10,
    marginTop: 20,
  },
  inputTextBox: {
    borderColor: "#A1AAB2",
    color: 'black',
    //fontFamily: "Roboto",
    marginTop:metrics.HEIGHT*0.02,
    borderRadius: 3.5,
    paddingLeft: 15,
    borderWidth: 1,
  },
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.06 : 0,
  },
});

export default PointItemComents;
