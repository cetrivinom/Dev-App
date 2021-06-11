import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

export const RegistreForm1 = ({ setForm }) => {
  const onPressNext = () => {
    setForm(1);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.labelTitle}>Ingresa los datos de tu cuenta</Text>
        <TextInput
          style={styles.inputTextBox}
          placeholder="Correo electrónico"
        />
        <TextInput style={styles.inputTextBox} placeholder="Contraseña" />
        <TextInput
          style={styles.inputTextBox}
          placeholder="Repetir contraseña"
        />
      </View>
      <View style={[styles.box, styles.box2]}>
        <TouchableHighlight style={styles.btnNext} onPress={onPressNext}>
          <View>
            <Text style={styles.labelNext}>Siguiente</Text>
            <Image
              source={require("../../../resources/images/arrowRightLine.png")}
              style={styles.righLine}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.breadcums}>
          <Image source={require("../../../resources/images/Breadcums1.png")} />
        </View>
      </View>
    </View>
  );
};

export const RegistreForm2 = ({ setForm }) => {
  const [gender, setGender] = useState(null);
  const onPressNext = () => {
    setForm(2);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.labelTitle}>Selecciona tu género</Text>
        <View style={styles.containerForm}>
          <TouchableOpacity onPress={() => setGender("M")}>
            <View style={styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riWomenFill.png")}
                style={styles.righLine3}
              />
              <Text style={styles.labelItem}>Mujer</Text>
              <Image
                source={
                  gender === "M"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
          <TouchableOpacity onPress={() => setGender("H")}>
            <View style={styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riMenFill.png")}
                style={styles.righLine3}
              />
              <Text style={styles.labelItem}>Hombre</Text>
              <Image
                source={
                  gender === "H"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
          <TouchableOpacity onPress={() => setGender("O")}>
            <View style={styles.containerForm2}>
              <Image
                source={require("../../../resources/images/riGenderlessFill.png")}
                style={styles.righLine3}
              />
              <Text style={styles.labelItem}>Otro</Text>
              <Image
                source={
                  gender === "O"
                    ? require("../../../resources/images/checkboxCircle.png")
                    : require("../../../resources/images/unCheckboxCircle.png")
                }
                style={styles.righLine2}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <TouchableHighlight style={styles.btnNext} onPress={onPressNext}>
          <View>
            <Text style={styles.labelNext}>Siguiente</Text>
            <Image
              source={require("../../../resources/images/arrowRightLine.png")}
              style={styles.righLine}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.breadcums}>
          <Image source={require("../../../resources/images/Breadcums2.png")} />
        </View>
      </View>
    </View>
  );
};

export const RegistreForm3 = ({ setForm }) => {
  const onPressNext = () => {
    setForm(3);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.labelTitle}>Ingresa tu fecha de nacimiento</Text>
      </View>
      <View style={[styles.box, styles.box2]}>
        <TouchableHighlight style={styles.btnNext} onPress={onPressNext}>
          <View>
            <Text style={styles.labelNext}>Siguiente</Text>
            <Image
              source={require("../../../resources/images/arrowRightLine.png")}
              style={styles.righLine}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.breadcums}>
          <Image source={require("../../../resources/images/Breadcums3.png")} />
        </View>
      </View>
    </View>
  );
};

export const RegistreForm4 = (props) => {
  const [value, setValue] = useState(null);
  const onPressNext = () => {
    props.navigation.navigate("Home");
  };

  const onPressSi = () => {
    setValue("Si");
  };

  const onPressNo = () => {
    setValue("No");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.labelTitle1}>
          ¿Te acompaña un dulto responsable?
        </Text>
        <View style={styles.containerForm21}>
          <TouchableOpacity onPress={onPressSi}>
            <View
              style={[
                styles.containerForm3,
                value === "Si" && styles.containerForm31,
              ]}
            >
              <Text
                style={[
                  styles.labelItemYes,
                  value === "Si" && styles.labelItemYes1,
                ]}
              >
                Si
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressNo}>
            <View
              style={[
                styles.containerForm4,
                value === "No" && styles.containerForm41,
              ]}
            >
              <Text
                style={[
                  styles.labelItemNo,
                  value === "No" && styles.labelItemYes1,
                ]}
              >
                No
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.box, styles.box2]}>
        <TouchableHighlight style={styles.btnNext} onPress={onPressNext}>
          <View>
            <Text style={styles.labelNext}>Finalizar</Text>
            <Image
              source={require("../../../resources/images/arrowRightLine.png")}
              style={styles.righLine}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.breadcums}>
          <Image source={require("../../../resources/images/Breadcums3.png")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 15,
    marginLeft: 17,
  },
  box: {
    flex: 1,
  },
  box1: {
    flex: 10,
  },
  //footer
  box2: {
    flex: 2,
  },
  labelTitle: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#003031",
    marginBottom: 32,
  },
  inputTextBox: {
    height: 56,
    borderColor: "#A1AAB2",
    borderRadius: 3.5,
    paddingLeft: 15,
    borderWidth: 1,
    marginBottom: 30,
  },
  btnNext: {
    backgroundColor: "#132A3E",
    height: 42,
    borderRadius: 25,
  },
  labelNext: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    width: "100%",
  },
  righLine: {
    position: "absolute",
    top: 10,
    left: 310,
  },
  breadcums: {
    marginTop: 30,
    alignSelf: "center",
  },
  containerForm: {
    backgroundColor: "#E7EAEC",
    marginBottom: 24,
    paddingLeft: 52,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    height: 48,
  },
  containerForm2: {
    flexDirection: "row",
  },
  righLine: {
    position: "absolute",
    top: 10,
    left: 310,
  },
  righLine2: {
    position: "absolute",
    left: 270,
  },
  righLine3: {
    position: "absolute",
    right: 320,
  },
  containerForm21: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerForm3: {
    justifyContent: "center",
    alignItems: "center",
    width: 175,
    height: 82,
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 16,
    borderColor: "#00AAAD",
  },
  containerForm31: {
    backgroundColor: "#00AAAD",
  },
  containerForm4: {
    justifyContent: "center",
    alignItems: "center",
    width: 175,
    height: 82,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 16,
    borderColor: "#902857",
  },
  containerForm41: {
    backgroundColor: "#902857",
  },
  labelTitle1: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.00125,
    color: "#003031",
    marginBottom: 96,
  },
  labelItemYes: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    color: "#00AAAD",
  },
  labelItemYes1: {
    color: "#FFFFFF",
  },
  labelItemNo: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.0015,
    color: "#902857",
  },
});
