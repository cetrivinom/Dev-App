import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Styles from "./styles";
import AuthContext from "../../../../context/auth/authContext";

export const Footer = (props) => {
  const { auth, message, signUp } = useContext(AuthContext);
  const { setForm, formValue, title, data } = props;
  console.log("data::Footer", data);
  const onPressNext = () => {
    if (formValue !== 4) {
      setForm(formValue);
    } else {
      signUp(data);
      if (auth) {
        props.navigation.navigate("Home");
      }
    }
  };

  return (
    <View style={[Styles.box, Styles.box2]}>
      <TouchableHighlight style={Styles.btnNext} onPress={onPressNext}>
        <View>
          <Text style={Styles.labelNext}>{title}</Text>
          <Image
            source={require("../../../resources/images/arrowRightLine.png")}
            style={Styles.righLine}
          />
        </View>
      </TouchableHighlight>
      <View style={Styles.breadcums}>
        <Image source={require("../../../resources/images/Breadcums1.png")} />
      </View>
    </View>
  );
};

export const RegistreForm1 = ({ setForm, setData, data }) => {
  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Ingresa los datos de tu cuenta</Text>
        <TextInput
          style={Styles.inputTextBox}
          placeholder="Correo electrónico"
          onChangeText={(e) => setData({ ...data, email: e })}
        />
        <TextInput
          style={Styles.inputTextBox}
          placeholder="Contraseña"
          onChangeText={(e) => setData({ ...data, password: e })}
        />
        <TextInput
          style={Styles.inputTextBox}
          placeholder="Repetir contraseña"
          onChangeText={(e) => setData({ ...data, rePassword: e })}
        />
      </View>
      <Footer formValue={1} title="Siguiente" setForm={setForm} />
    </View>
  );
};

export const RegistreForm2 = ({ setForm, setData, data }) => {
  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Selecciona tu género</Text>
        <View style={Styles.containerForm}>
          <TouchableOpacity onPress={() => setData({ ...data, gender: "M" })}>
            <View style={Styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riWomenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Mujer</Text>
              <Image
                source={
                  data.gender === "M"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.containerForm}>
          <TouchableOpacity onPress={() => setData({ ...data, gender: "H" })}>
            <View style={Styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riMenFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Hombre</Text>
              <Image
                source={
                  data.gender === "H"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.containerForm}>
          <TouchableOpacity onPress={() => setData({ ...data, gender: "O" })}>
            <View style={Styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riGenderlessFill.png")}
                style={Styles.righLine3}
              />
              <Text style={Styles.labelItem}>Otro</Text>
              <Image
                source={
                  data.gender === "O"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={Styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer formValue={2} title="Siguiente" setForm={setForm} />
    </View>
  );
};

export const RegistreForm3 = ({ setForm, setData, data }) => {
  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Ingresa tu fecha de nacimiento</Text>
      </View>
      <Footer formValue={3} title="Siguiente" setForm={setForm} />
    </View>
  );
};

export const RegistreForm4 = (props) => {
  const { setData, data } = props;
  console.log("data::RegistreForm4", data);
  const onPressSi = () => {
    setData({ ...data, oldMen: "Si" });
  };

  const onPressNo = () => {
    setData({ ...data, oldMen: "No" });
  };

  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle1}>
          ¿Te acompaña un dulto responsable?
        </Text>
        <View style={Styles.containerForm21}>
          <TouchableOpacity onPress={onPressSi}>
            <View
              style={[
                Styles.containerForm3,
                data.oldMen === "Si" && Styles.containerForm31,
              ]}
            >
              <Text
                style={[
                  Styles.labelItemYes,
                  data.oldMen === "Si" && Styles.labelItemYes1,
                ]}
              >
                Si
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressNo}>
            <View
              style={[
                Styles.containerForm4,
                data.oldMen === "No" && Styles.containerForm41,
              ]}
            >
              <Text
                style={[
                  Styles.labelItemNo,
                  data.oldMen === "No" && Styles.labelItemYes1,
                ]}
              >
                No
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer {...props} formValue={4} title="Finalizar" data={data} />
    </View>
  );
};
