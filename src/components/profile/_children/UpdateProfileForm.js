import React, { useState,useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { DatePicker } from "react-native-wheel-datepicker";
import Styles from "./styles";
import moment from "moment";
import AuthContext from "../../../../context/auth/authContext";

export const Footer = (props) => {
  const {user,  updateUser,updatePassword,pass } = useContext(AuthContext);
  const onPressSave = () => {
    console.log('pass',pass);
    if(pass.currentPass.length > 1 && pass.newPass.length > 1){
      console.log('action.changePass');
      updatePassword(pass).then((result) => {
        console.log('result',result);
        if(result)
        props.navigation.navigate("Profile");
      });
    }else {
      updateUser(user);
      props.navigation.navigate("Profile");
    }
  };

  return (
    <View style={Styles.containerSaveButton}>
      <TouchableHighlight onPress={onPressSave}>
        <Text style={Styles.labelSaveButton}>Guardar</Text>
      </TouchableHighlight>
    </View>
  );
};

export const UpdateGender = (props) => {
  const {user,updateUserInputChange } = useContext(AuthContext);

  return (
    <View style={[Styles.box, Styles.box2]}>
      <View style={Styles.container}>
        <Text style={Styles.labelTitle}>Selecciona tu género</Text>
        <View style={Styles.containerForm1}>
          <TouchableOpacity onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'M'})}>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riWomenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Mujer</Text>
              <Image
                source={
                  user.gender === "M"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.containerForm1}>
          <TouchableOpacity onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'H'})}>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riMenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Hombre</Text>
              <Image
                source={
                  user.gender === "H"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.containerForm1}>
          <TouchableOpacity onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'O'})}>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riGenderlessFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Otro</Text>
              <Image
                source={
                  user.gender === "O" || user.gender === undefined
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const UpdateBirthDate = (props) => {
  const {user,updateUserInputChange } = useContext(AuthContext);
  return (
    <View style={[Styles.box, Styles.box2]}>
      <View style={Styles.container}>
        <Text style={Styles.labelTitle}>Ingresa tu fecha de nacimiento</Text>
        <View style={{ flex: 0.9, justifyContent: "center" }}>
          <DatePicker
            mode="date"
            date={new Date(moment(user.birdDate!==''?user.birdDate:moment().add(-18, "years").toDate()))}
            maximumDate={moment().add(-16, "years").toDate()}
            minimumDate={moment().add(-120, "years").toDate()}
            onDateChange={(date) => {
              updateUserInputChange({ 'field': 'birdDate', 'value': moment(date).format("YYYY-MM-DD")});
            }}
            style={{ backgroundColor: "white" }}
          />
        </View>
      </View>
    </View>
  );
};

export const UpdatePassword= (props) => {
  const {updatePassInputChange } = useContext(AuthContext);
  return (
    <View style={[Styles.box, Styles.box2]}>
      <View style={Styles.container}>
        <Text style={Styles.labelTitle}>Ingresa tu nueva contraseña</Text>
        <View style={Styles.SectionStyle}>
          <Image
            source={require('../../../resources/images/lock.png')} //Change your icon image here
            style={Styles.ImageStyle}
          />
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={true}
            placeholder="Contraseña Actual"
            underlineColorAndroid="transparent"
            onChangeText={(e) => {
              updatePassInputChange({ 'field': 'currentPass', 'value': e});            
            }}
          />
        </View>
        <View style={Styles.SectionStyle}>
          <Image
            source={require('../../../resources/images/lock.png')} //Change your icon image here
            style={Styles.ImageStyle}
          />
          <TextInput
            style={{ flex: 1}}
            secureTextEntry={true}
            placeholder="Nueva Contraseña"
            underlineColorAndroid="transparent"
            onChangeText={(e) => {
              updatePassInputChange({ 'field': 'newPass', 'value': e});  
            }}
          />
        </View>
      </View>
    </View>
  );
};

const ShowComponentToUpdate = (props) => {
  const { field = "" } = props.navigation.state.params || {};
  if (field == "genero") {
    return <UpdateGender {...props}></UpdateGender>;
  } else if (field == "birthdate") {
    return <UpdateBirthDate {...props}></UpdateBirthDate>;
  } else if (field == "password") {
    return <UpdatePassword {...props}></UpdatePassword>;
  } else return null;
};

const UpdateProfileForm = (props) => {
  const onPressBack = () => {
    props.navigation.navigate("Profile");
  };
  return (
    <View style={Styles.wrapper}>
      <View style={Styles.statusBarBackground}>
      </View>
      <View style={[Styles.box, Styles.box1]}>
        <View style={Styles.containerHeader}>
          <View style={Styles.containerForm}>
            <TouchableOpacity onPress={onPressBack} style={Styles.iconLeft}>
              <Image source={require("../../../resources/images/left.png")} />
            </TouchableOpacity>
            <Text style={Styles.labelTitleHeader}>Editar Perfil</Text>
          </View>
        </View>
      </View>
      <ShowComponentToUpdate {...props}></ShowComponentToUpdate>
      <Footer {...props} />
    </View>
  );
};

export default UpdateProfileForm;
