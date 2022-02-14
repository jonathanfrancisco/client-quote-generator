import React from 'react';
import { View } from 'react-native';
import ActionCard from '../ActionCard';
import MainPageHeader from '../MainPageHeader';

const Home = ({ navigation }) => {
  return (
    <View>
      <MainPageHeader />
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
        }}
      >
        <ActionCard
          text='Create Quote'
          onPress={() => navigation.navigate('createQuote')}
        />
        <ActionCard
          text='Product List'
          onPress={() => {
            alert('Feature not yet available');
          }}
        />
        <ActionCard
          text='Client List'
          onPress={() => {
            alert('Feature not yet available');
          }}
        />
        <ActionCard
          text='Soon'
          onPress={() => {
            alert('Feature not yet available');
          }}
        />
      </View>
    </View>
  );
};

export default Home;
