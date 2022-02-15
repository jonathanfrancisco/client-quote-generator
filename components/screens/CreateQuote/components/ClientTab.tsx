import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../../../theme';

const ClientTab = ({ navigation }) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.Colors.backgroundPrimary,
        padding: 20,
      }}
    >
      <Text>Client Tab </Text>
      <View
        style={{
          alignItems: 'flex-end',
        }}
      >
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
    </View>
  );
};

export default ClientTab;
