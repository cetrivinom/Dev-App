import React from 'react';
import {View, FlatList} from 'react-native';
import Header from './_children/Header';
import FilterContent from './_children/FilterContent';
import CardItemLink from './_children/CardItemLink';

const Links = props => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Primer episodio de podcast "Refugio en pauta"...',
      date: '01-JUN-2021',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Segundo episodio de podcast "Refugio en pauta"...',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Tercer episodio de podcast "Refugio en pauta"...',
      date: '30-JUN-2021',
    },
  ];

  return (
    <View>
      <Header {...props} showBack={false} title="Enlaces de interés" />
      <FilterContent />
      <FlatList
        data={data}
        renderItem={item => (
          <CardItemLink title={item.item.title} date={item.item.date} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Links;
