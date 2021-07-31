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
import { Snackbar } from "react-native-paper";

export const Footer = (props) => {
  const {user,  updateUser,updatePassword,updatePassInputChange,pass } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const onDismissSnackBar = () => setVisible(false);
  const onPressSave = () => {
    if(pass && pass.currentPass.length > 1 && pass.newPass.length > 1){
      updatePassword(pass).then((result) => {
        if(result.value){
          props.navigation.navigate("Profile");
        }
        else{
          setVisible(true);
          setError(result.message)
        }
        updatePassInputChange({ 'field': 'currentPass', 'value': ''});  
        updatePassInputChange({ 'field': 'newPass', 'value': ''});  
      });
    }else {
      updateUser(user);
      props.navigation.navigate("Profile");
    }
  };

  return (
    <View style={Styles.containerSaveButton}>
    <View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: "X",
          onPress: () => {
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
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
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'M'})}>
          <View style={Styles.sectionGender}>
            <Image
              source={require("../../../resources/images/riWomenFill.png")}
            />
          </View>
          <View style={Styles.sectionLabel}>
            <Text style={Styles.labelItem}>Mujer</Text>
          </View>
          <View style={Styles.sectionSelect}>
            <Image
              source={
                user.gender === "M" || user.gender === undefined
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
                }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'H'})}>
          <View style={Styles.sectionGender}>
            <Image
              source={require("../../../resources/images/riMenFill.png")}
            />
          </View>
          <View style={Styles.sectionLabel}>
            <Text style={Styles.labelItem}>Hombre</Text>
          </View>
          <View style={Styles.sectionSelect}>
            <Image
              source={
                user.gender === "H" || user.gender === undefined
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
                }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => updateUserInputChange({ 'field': 'gender', 'value': 'O'})}>
          <View style={Styles.sectionGender}>
            <Image
              source={require("../../../resources/images/riGenderlessFill.png")}
            />
          </View>
          <View style={Styles.sectionLabel}>
            <Text style={Styles.labelItem}>Otro</Text>
          </View>
          <View style={Styles.sectionSelect}>
            <Image
              source={
                user.gender === "O" || user.gender === undefined
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
                }
            />
          </View>
        </TouchableOpacity>
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
