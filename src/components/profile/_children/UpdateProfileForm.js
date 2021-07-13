import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { DatePicker } from "react-native-wheel-datepicker";
import Styles from "./styles";
import moment from "moment";
import AuthContext from "../../../../context/auth/authContext";

export const Footer = (props) => {
  const {user,  updateUser } = useContext(AuthContext);
  const onPressSave = () => {
    updateUser(user);
    props.navigation.navigate("Profile");
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
const ShowComponentToUpdate = (props) => {
  const { field = "" } = props.navigation.state.params || {};
  if (field == "genero") {
    return <UpdateGender {...props}></UpdateGender>;
  } else if (field == "birthdate") {
    return <UpdateBirthDate {...props}></UpdateBirthDate>;
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
