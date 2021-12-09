import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Linking
} from "react-native";
import { DatePicker } from "react-native-wheel-datepicker";
import moment from "moment";
import AuthContext from "../../../../context/auth/authContext";
import { validateEmail } from "../../../utilities/helpers";
import { Snackbar } from "react-native-paper";
import Styles from "./styles";
import database from '@react-native-firebase/database'
import { CheckBox } from 'react-native-elements'
/**
 * Componente Footer del registro, se llama la accion de signUp al terminar el registro
 * @param {Object} this.props - objeto de propiedades heredados de la clase padre.
 * @return {Object} <View /> Footer del registro.
 */
export const Footer = (props) => {
  const { auth, user, message, signUp, updateUser } = useContext(AuthContext);
  const { setForm, formValue, title, data, setError, error } = props;
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onPressNext = () => {
    if (formValue !== 4 && !error) {
      setForm(formValue);
    } else {
      signUp(data).then((user) => {
        if (user) {
          updateUser(user);
          props.navigation.navigate("Home");
        } else {
          setVisible(true);
        }
      });
      if (auth) {
        //nunca se llama, el useEffect predomina
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
        <Image source={formValue == 2 ? require("../../../resources/images/Breadcums2.png") : require("../../../resources/images/Breadcums3.png")} />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: "X",
          onPress: () => {
            // Do something
          },
        }}
      >{message}
      </Snackbar>
    </View>
  );
};
/**
 * Componente del registro que captura el email y el password
 * @param {Object} setForm - manejador que administra el formulario de manera dinamica
 * @param {Object} setData - manejador del objeto (data)
 * @param {Object} data - objeto del registro
 * @param {string} data.email - propiedad email del registro
 * @param {string} data.password - propiedad password del registro
 * @return {Object} <View /> Formulario que captura la informacion.
 */
export const RegistreForm1 = ({ setForm, setData, data }) => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const { email, password, rePassword } = data;
  const [textoFin, setTextoFin] = useState([]);
  const [variableContinuar, setVariablecontinuar] = useState(true);
  const [isSelected, setSelection] = useState(false);
  const generatePaymentField = () => {
    var noGuest = 4;
    var payments = [];


    database()
      .ref('config/TYC')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {

          var textoa = snapshot.val().textotc;
          var res = textoa.split(" ");
          for (var i = 0; i < res.length; i++) {

            if (res[i].match(/\[([\w\s]*)\]/g)) {
              var param = res[i].replace(/[\[\]]/g, '')
              var t = snapshot.child(param).val().texto
              let supportedURL = snapshot.child(param).val().link;
              payments.push(<Text key={i} style={Styles.labelTerminoLink} onPress={() => {
                Linking.openURL(supportedURL);
              }}>{t} </Text>)

            } else {
              payments.push(<Text key={i}  style={Styles.labelTermino} >{

                res[i]


              } </Text>)
            }



          }

          setTextoFin(payments)

        }
      })

    return textoFin;


  }

  useEffect(() => {
    setTextoFin(generatePaymentField);
  }, []);


  const onPressNext = () => {
    var ok = true;
    if (ok && password !== rePassword) {
      setErrorRePassword("Su contraseña no coinciden");
      ok = false;
    }
    if (!validateEmail(email)) {
      setErrorEmail("Correo electrónico invalido");
      ok = false;
    }
    if (password === "") {
      setErrorPassword("Contraseña invalida");
      ok = false;
    }
    if (password.length < 6 || rePassword.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      ok = false;
    }
    if (rePassword === "") {
      setErrorRePassword("Contraseña invalida");
      ok = false;
    }
    if (ok) {
      setForm(1);
    }
  };

  const setTerminos = () => {
    console.log("entre")
    setSelection(!isSelected)
    setVariablecontinuar(!variableContinuar);
  }

  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Ingresa los datos de tu cuenta</Text>
        <View style={Styles.SectionStyle}>
          <Image
            source={require('../../../resources/images/email.png')}
            style={Styles.ImageStyle}
          />
          <TextInput
            style={
              errorEmail !== "" ? Styles.inputTextBoxError : Styles.inputTextBox
            }
            placeholder="Correo electrónico"
            placeholderTextColor="#a9a9a9"
            onChangeText={(e) => {
              setData({ ...data, email: e });
              setErrorEmail("");
              setErrorPassword("");
              setErrorRePassword("");
            }}
          />
        </View>
        {errorEmail !== "" && (
          <Text style={Styles.labelError}>{errorEmail}</Text>
        )}
        <View style={Styles.SectionStyle}>
          <Image
            source={require('../../../resources/images/lock.png')}
            style={Styles.ImageStyle2}
          />
          <TextInput
            style={
              errorPassword !== ""
                ? Styles.inputTextBoxError
                : Styles.inputTextBox
            }
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#a9a9a9"
            onChangeText={(e) => {
              setData({ ...data, password: e });
              setErrorEmail("");
              setErrorPassword("");
              setErrorRePassword("");
            }}
          />
        </View>
        {errorPassword !== "" && (
          <Text style={Styles.labelError}>{errorPassword}</Text>
        )}
        <View style={Styles.SectionStyle}>
          <Image
            source={require('../../../resources/images/lock.png')}
            style={Styles.ImageStyle2}
          />
          <TextInput
            style={
              errorRePassword !== ""
                ? Styles.inputTextBoxError
                : Styles.inputTextBox
            }
            secureTextEntry={true}
            placeholder="Repetir contraseña"
            placeholderTextColor="#a9a9a9"
            onChangeText={(e) => {
              setData({ ...data, rePassword: e });
              setErrorEmail("");
              setErrorPassword("");
              setErrorRePassword("");
            }}
          />
        </View>
        {errorRePassword !== "" && (
          <Text style={Styles.labelError}>{errorRePassword}</Text>
        )}

        <View style={Styles.TerminosStyleDiv}>
          <CheckBox
            containerStyle={{padding:0, margin:0}}
            checked={isSelected}
            onPress={() => setTerminos()}
            uncheckedColor ={'#425565'}
            checkedColor='#00AAAD'
            checkedIcon='check-square'
          />
          {textoFin}
        </View>
      </View>


      <View style={[Styles.box, Styles.box2]}>
        <TouchableHighlight disabled={variableContinuar} style={!variableContinuar
          ? Styles.btnNext
          : Styles.btnNextDis} onPress={onPressNext}>
          <View>
            <Text style={Styles.labelNext}>Siguiente</Text>
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
    </View>
  );
};
/**
 * Componente del registro que captura el genero
 * @param {Object} setForm - manejador que administra el formulario de manera dinamica
 * @param {Object} setData - manejador del objeto (data)
 * @param {Object} data - objeto del registro
 * @param {string} data.email - propiedad genero del usuario
 * @return {Object} <View /> Formulario que captura la informacion.
 */
export const RegistreForm2 = ({ setForm, setData, data }) => {
  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Selecciona tu género</Text>
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => setData({ ...data, gender: "M" })}>
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
                data.gender === "M"
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => setData({ ...data, gender: "H" })}>
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
                data.gender === "H"
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.SectionStyle1} onPress={() => setData({ ...data, gender: "O" })}>
          <View style={Styles.sectionGender}>
            <Image
              source={require("../../../resources/images/riGenderlessFill.png")}
            />
          </View>
          <View style={Styles.sectionLabel}>
            <Text style={Styles.labelItem}>Diverso</Text>
          </View>
          <View style={Styles.sectionSelect}>
            <Image
              source={
                data.gender === "O"
                  ? require("../../../resources/images/checkboxCircle.png")
                  : require("../../../resources/images/unCheckboxCircle.png")
              }
            />
          </View>
        </TouchableOpacity>
      </View>
      <Footer formValue={2} title="Siguiente" setForm={setForm} />
    </View>
  );
};
/**
 * Componente del registro que captura la fecha de nacimiento
 * @param {Object} setForm - manejador que administra el formulario de manera dinamica
 * @param {Object} setData - manejador del objeto (data)
 * @param {Object} data - objeto del registro
 * @param {string} data.birdDate - propiedad fecha de nacimiento del usuario
 * @return {Object} <View /> Formulario que captura la informacion.
 */
export const RegistreForm3 = ({ setForm, setData, data, props }) => {
  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Text style={Styles.labelTitle}>Ingresa tu fecha de nacimiento</Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 0.1, flexDirection: 'row' }}>
            <View style={{ flex: 0.32 }}>
              <Text style={Styles.labelBirthdate}>Día</Text>
            </View>
            <View style={{ flex: 0.37 }}>
              <Text style={Styles.labelBirthdate}>Mes</Text>
            </View>
            <View style={{ flex: 0.35 }}>
              <Text style={Styles.labelBirthdate}>Año</Text>
            </View>
          </View>
          <DatePicker
            mode="date"
            date={new Date(moment(data.birdDate !== '' ? data.birdDate : moment().add(-18, "years").toDate()))}
            maximumDate={moment().add(-7, "years").toDate()}
            minimumDate={moment().add(-120, "years").toDate()}
            onDateChange={(date) => {
              const age = new Date(Date.now() - date.getTime());
              setData({ ...data, birdDate: moment(date).format("YYYY-MM-DD"), age: Math.abs(age.getUTCFullYear() - 1970) });
            }}
            style={{ backgroundColor: "white" }}
          />
        </View>
      </View>
      {data.age < 18 && (
        <Footer formValue={3} title="Siguiente" setForm={setForm} />
      )}
      {data.age >= 18 && (
        <Footer {...props} formValue={4} title="Finalizar" data={data} />
      )}
    </View>
  );
};
/**
 * Componente del registro que captura informacion de acompañamiento de un adulto en caso de ser menor de edad
 * @param {Object} setForm - manejador que administra el formulario de manera dinamica
 * @param {Object} setData - manejador del objeto (data)
 * @param {Object} data - objeto del registro
 * @param {string} data.oldMen - propiedad de acompañamiento en caso de ser menor
 * @return {Object} <View /> Formulario que captura la informacion.
 */
export const RegistreForm4 = (props) => {
  const { setData, data } = props;
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
          ¿Te acompaña un adulto responsable?
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
