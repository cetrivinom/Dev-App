import { StyleSheet } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    //marginTop:metrics.WIDTH*0.00,
  },
  containerForm: {
    marginHorizontal: 16,
  },
  s: {
    marginTop: 40,
  },
  labelInicio: {
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: 0.0015,
    textAlign: "center",
    color: "#003031",
    marginTop: 24,
    marginBottom: 32,
    fontFamily:'Dosis-Regular'
  },
  labelAccount: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",
    color: "#003031",
    fontFamily:'Dosis-Regular'
  },
  labelForgetPassword: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    textDecorationLine: "underline",
    marginBottom: 32,
    color:"#FFFFFF",
  },
  labelWelcome: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing:  0.0015,
    fontWeight: "normal",
    marginBottom: 10,
    marginTop: 10,
    color:"#FFFFFF",
    fontFamily:'Dosis-Regular'
  },
  labelIngresa: {
    textAlign: "center",
    color: "#003031",
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
    marginBottom: 16,
    fontFamily:'Dosis-Regular'
  },
  labelLogin: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    fontFamily:'Roboto-Regular'
  },
  labelSocial: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    paddingLeft: 5,
    fontFamily:'Dosis-Regular'
  },
  inputTextBox: {
    flex:1,
    borderColor: "#E7EAEC",
    color: 'black',
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily:'Dosis-Regular'
  },
  inputTextBoxError: {
    flex:1,
    borderColor: "#DD3338",
    color: 'black',
    borderWidth: 1,
    fontSize: 16,
    fontFamily:'Dosis-Regular'
  },
  labelError: {
    color: "#8F3D40",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.004,
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 15,
    fontFamily:'Dosis-Regular'
  },
  btnIniciar: {
    backgroundColor: "#132A3E",
    borderRadius: 25,
  },
  btnIniciarR: {
    backgroundColor: "#132A3E",
    borderRadius: 25,
    marginBottom: 24,
    marginTop:32
  },
  btnSocialAccountGoogle: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#A1AAB2",
    paddingHorizontal: 50,
    borderWidth: 1,
    height: 42,
    width: 170,
    borderRadius: 25,
  },
  btnSocialAccountFacebook: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#A1AAB2",
    paddingHorizontal: 45,
    borderWidth: 1,
    height: 42,
    width: 170,
    borderRadius: 25,
    marginLeft: 16,
  },
  noCuenta: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-end",
    marginBottom: 32,
  },
  containerSocial: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-end",
    marginBottom: 32,
  },
  labelRegistrate: {
    color: "#902857",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19,
    letterSpacing: 0.005,
    marginLeft: 8,
    fontFamily:'Dosis-Regular'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7EAEC',
    height: 56,
    borderRadius: 5,
    marginTop: 30,
  },
  ImageStyle: {
      margin: 14,
      height: 20,
      width: 20,
      resizeMode: 'stretch',
      alignItems: 'center',
  },
  ImageStyle2: {
      margin: 14,
      height: 24,
      width: 18,
      resizeMode: 'stretch',
      alignItems: 'center',
  },
});
