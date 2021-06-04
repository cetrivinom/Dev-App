import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Header from './_children/Header';
import CardItemFavorite from './_children/CardItemFavorite';

const Favorites = props => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Consultorio Jurídico UDEA - ACNUR...',
      title2: 'Restringido con modalidad remota',
      title3: '8:00am - 5:00pm',
      date: '01-JUN-2021',
      point: 2,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'CRC - PAMPLONA',
      title2: 'Restringido con modalidad remota',
      title3: '8:00am - 3:00pm',
      point: 4,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Americares ARAUCA - Centro de Sal...',
      title2: 'Activo con modalidad presencial',
      date: '30-JUN-2021',
      title3: '8:00am - 12:00pm',
      point: 5,
    },
  ];
  return (
    <View>
      <Header {...props} showBack={false} title="Puntos favoritos" />
      <FlatList
        data={data}
        renderItem={item => (
          <CardItemFavorite
            title={item.item.title}
            title2={item.item.title2}
            title3={item.item.title3}
            point={item.item.point}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Favorites;
