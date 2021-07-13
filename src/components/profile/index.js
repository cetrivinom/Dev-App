import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardItemProfile from "./_children/CardItemProfile";
import AuthContext from "../../../context/auth/authContext";
import { metrics } from "../../utilities/Metrics";

const Profile = (props) => {
  const { navigation } = props;
  const { user, signOut } = useContext(AuthContext);
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressLogOff = () => {
    signOut();
    navigation.navigate("Login");
  };

  return (
      <View style={styles.wrapper}>
        <View style={styles.statusBarBackground}>
        </View>
        <View style={[styles.box, styles.box1]}>
          <View style={styles.containerHeader}>
            <View style={styles.containerForm}>
              <TouchableOpacity onPress={onPressBack} style={styles.iconLeft}>
                <Image source={require("../../resources/images/left.png")} />
              </TouchableOpacity>
              <Text style={styles.labelTitleHeader}>Perfil</Text>
            </View>
          </View>
        </View>
        <View style={[styles.box, styles.box2]}>
          <View style={styles.container}>
            <CardItemProfile
              title="Correo electrónico"
              subTitle={user ? user.email : ""}
            />
            <CardItemProfile
              {...props}
              title="Fecha de nacimiento"
              field="birthdate"
              subTitle={user ? user.birdDate : ""}
              showImge
            />
            <CardItemProfile
              {...props}
              title="Género"
              field="genero"
              subTitle={
                user
                  ? user.gender == "H"
                    ? "Hombre"
                    : user.gender == "M"
                    ? "Mujer"
                    : "Otro"
                  : ""
              }
              showImge
            />
            <CardItemProfile
              {...props}
              title="Contraseña"
              subTitle="****************"
              showImge
            />
            <View style={styles.containerBodyLogOff}>
              <TouchableOpacity onPress={onPressLogOff}>
                <Text style={styles.labelTitleLogOff}>Cerrar sesión</Text>
              </TouchableOpacity>
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
  container: {
    marginTop: 40,
    marginRight: 15,
    marginLeft: 17,
  },
  containerBodyLogOff: {
    marginTop: 20,
    marginLeft: 10,
  },
  containerHeader: {
    height: 56,
    alignItems: "center",
    backgroundColor: "#00AAAD",
    justifyContent: "center",
  },
  containerForm: {
    flexDirection: "row",
  },
  labelTitleHeader: {
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#FFFFFF",
  },
  labelTitleLogOff: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    color: "#00AAAD",
  },
  iconLeft: {
    position: "absolute",
    right: metrics.WIDTH * 0.45,
  },  
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? metrics.WIDTH * 0.06 : 0,
    backgroundColor: "#00AAAD",
  },
});

export default Profile;
