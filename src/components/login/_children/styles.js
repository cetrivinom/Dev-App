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
  },
  labelAccount: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: "center",
    color: "#003031",
  },
  labelForgetPassword: {
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    textDecorationLine: "underline",
    marginBottom: 32,
    marginTop: 30,
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
  },
  labelLogin: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
  },
  labelSocial: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    letterSpacing: 0.00125,
    textAlign: "center",
    paddingVertical: 12,
    paddingLeft: 5,
  },
  inputTextBox: {
    flex:1,
    borderColor: "#A1AAB2",
    color: 'black',
    fontSize: 16,
    color: "#000",
  },
  inputTextBoxError: {
    flex:1,
    borderColor: "#DD3338",
    color: 'black',
    borderWidth: 1,
    fontSize: 16,
  },
  labelError: {
    color: "#DD3338",
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.004,
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 15,
  },
  btnIniciar: {
    backgroundColor: "#132A3E",
    height: 42,
    borderRadius: 25,
    marginBottom: 24,
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
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A1AAB2',
    height: 56,
    borderRadius: 5,
    marginTop: 30,
  },
  ImageStyle: {
      margin: 14,
      height: 24,
      width: 24,
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
