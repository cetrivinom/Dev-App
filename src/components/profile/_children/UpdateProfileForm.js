import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { DatePicker } from "react-native-wheel-datepicker";
import Styles from "./Styles";
import moment from "moment";
import AuthContext from "../../../../context/auth/authContext";

export const Footer = (props) => {
  const onPressSave = () => {
    console.log("hi");
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
  const {
    title = "Consultorio Jurídico UDEA - ACNUR...",
    title2 = "",
    title3 = "",
    point = 1,
  } = props || {};

  return (
    <View style={[Styles.box, Styles.box2]}>
      <View style={Styles.container}>
        <Text style={Styles.labelTitle}>Selecciona tu género</Text>

        <View style={Styles.containerForm1}>
          <TouchableOpacity>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riWomenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Mujer</Text>
              <Image
                source={require("../../../resources/images/checkboxCircle.png")}
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.containerForm1}>
          <TouchableOpacity>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riMenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Hombre</Text>
              <Image
                source={require("../../../resources/images/checkboxCircle.png")}
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.containerForm1}>
          <TouchableOpacity>
            <View style={Styles.containerForm}>
              <Image
                source={require("../../../resources/images/riGenderlessFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Otro</Text>
              <Image
                source={require("../../../resources/images/checkboxCircle.png")}
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
  const { point = 1 } = props || {};

  return (
    <View style={[Styles.box, Styles.box2]}>
      <View style={Styles.container}>
        <Text style={Styles.labelTitle}>Ingresa tu fecha de nacimiento</Text>
        <View style={{ flex: 0.9, justifyContent: "center" }}>
          <DatePicker
            mode="date"
            date={moment().add(-30, "years").toDate()}
            maximumDate={moment().add(-16, "years").toDate()}
            minimumDate={moment().add(-120, "years").toDate()}
            onDateChange={(date) => {
              console.log("date.", date, moment(date).format("YYYY-MM-DD"));
              //setData({ ...data, birdDate: moment(date).format("YYYY-MM-DD") });
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
  console.log("field1", field);

  if (field == "genero") {
    return <UpdateGender></UpdateGender>;
  } else if (field == "birthdate") {
    return <UpdateBirthDate></UpdateBirthDate>;
  } else return null;
};

const UpdateProfileForm = (props) => {
  const { field = "" } = props.navigation.state.params || {};
  console.log("field", field);
  const onPressBack = () => {
    props.navigation.navigate("Profile");
  };
  return (
    <View style={Styles.wrapper}>
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
      <Footer />
    </View>
  );
};

export default UpdateProfileForm;
