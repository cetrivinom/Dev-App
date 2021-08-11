import React, { useState } from "react";
import { View } from "react-native";
import Header from "../global/_children/Header";
import {
  RegistreForm1,
  RegistreForm2,
  RegistreForm3,
  RegistreForm4,
} from "./_children/RegistreForm";
import moment from "moment";
import Styles from "./styles";

const Registre = (props) => {
  const [form, setForm] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    rePassword: "",
    gender: "",
    birdDate: moment().add(-30, "years").toDate(),
    oldMen: "",
  });

  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return (
          <RegistreForm2 setForm={setForm} data={data} setData={setData} />
        );
      case 2:
        return (
          <RegistreForm3 setForm={setForm} data={data} setData={setData} />
        );
      case 3:
        return (
          <RegistreForm4
            {...props}
            setForm={setForm}
            data={data}
            setData={setData}
          />
        );
      default:
        return (
          <RegistreForm1 setForm={setForm} data={data} setData={setData} />
        );
    }
  };

  return (
    <View style={Styles.container}>
      <View style={[Styles.box, Styles.box1]}>
        <Header {...props} form={form} setForm={setForm} />
      </View>
      <View style={[Styles.box, Styles.box2]}>{renderSwitch(form)}</View>
    </View>
  );
};

export default Registre;
