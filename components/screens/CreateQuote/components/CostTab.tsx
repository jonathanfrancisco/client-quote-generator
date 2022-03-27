import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../../../theme';

const CostTab = ({ navigation }) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.Colors.backgroundPrimary,
        padding: 20,
      }}
    >
      <Text>Cost Tab </Text>
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
            navigation.navigate('benefitTab');
          }}
        />
      </View>
    </View>
  );
};

export default CostTab;