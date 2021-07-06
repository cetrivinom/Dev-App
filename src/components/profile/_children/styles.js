import { StyleSheet } from "react-native";
import { metrics } from "../../../utilities/Metrics";

export default StyleSheet.create({
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
    right: metrics.WIDTH * 0.55,
  },
  labelTitle: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#003031",
    marginBottom: 32,
  },
  labelSaveButton: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.0015,
    color: "#00AAAD",
    marginBottom: 32,
  },

  containerForm1: {
    backgroundColor: "#E7EAEC",
    marginBottom: 24,
    paddingLeft: 52,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    height: 48,
  },
  righLine2: {
    position: "absolute",
    left: metrics.WIDTH * 0.67,
  },
  righLine3: {
    position: "absolute",
    right: metrics.WIDTH * 0.8,
  },
  saveButton: {},
  containerSaveButton: {
    flexDirection: "column",
    flex: 1,
  },
});
