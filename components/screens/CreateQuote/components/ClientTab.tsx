import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';

import ClientDetailsForm from './ClientDetailsForm';

import theme from '../../../../theme';

const ClientTab = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        // height: '100%',
        backgroundColor: theme.Colors.backgroundPrimary,
        padding: 20,
      }}
    >
      <ClientDetailsForm />
      <View style={{ height: 1, margin: 12 }}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          title='Next'
          buttonStyle={{
            backgroundColor: theme.Colors.btnPrimary,
            borderRadius: 8,
          }}
          containerStyle={{
            width: 120,
          }}
          onPress={() => {
            navigation.navigate('benefitTab');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ClientTab;
