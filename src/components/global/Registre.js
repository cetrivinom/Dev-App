import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./_children/Header";
import {
  RegistreForm1,
  RegistreForm2,
  RegistreForm3,
  RegistreForm4,
} from "./_children/RegistreForm";

const Registre = (props) => {
  const [form, setForm] = useState(null);

  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return <RegistreForm2 setForm={setForm} />;
      case 2:
        return <RegistreForm3 setForm={setForm} />;
      case 3:
        return <RegistreForm4 {...props} setForm={setForm} />;
      default:
        return <RegistreForm1 setForm={setForm} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Header {...props} form={form} setForm={setForm} />
      </View>
      <View style={[styles.box, styles.box2]}>{renderSwitch(form)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  //footer
  box3: {
    flex: 2,
    backgroundColor: "#e3aa1a",
  },
});

export default Registre;
