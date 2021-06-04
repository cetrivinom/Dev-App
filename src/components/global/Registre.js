import React, {useState} from 'react';
import {View} from 'react-native';
import Header from './_children/Header';
import RegistreForm1 from './_children/RegistreForm1';
import RegistreForm2 from './_children/RegistreForm2';
import RegistreForm3 from './_children/RegistreForm3';
import RegistreForm4 from './_children/RegistreForm4';

const Registre = props => {
  const [form, setForm] = useState(null);
  const renderSwitch = param => {
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
    <View>
      <Header {...props} form={form} setForm={setForm} />
      {renderSwitch(form)}
    </View>
  );
};

export default Registre;
