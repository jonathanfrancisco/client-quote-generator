import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../../theme';

const BenefitTab = ({ navigation }) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.Colors.backgroundPrimary,
        padding: 20,
      }}
    >
      <Text>Benefit Tab </Text>
      <View style={{ height: 1, margin: 12 }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          title='Back'
          buttonStyle={{
            backgroundColor: theme.Colors.btnSecondary,
            borderRadius: 8,
          }}
          containerStyle={{
            width: 120,
          }}
          onPress={() => {
            navigation.navigate('clientTab');
          }}
        />
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
            navigation.navigate('costTab');
          }}
        />
      </View>
    </View>
  );
};

export default BenefitTab;
