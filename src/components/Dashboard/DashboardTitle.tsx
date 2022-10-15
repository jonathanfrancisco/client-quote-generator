import React from 'react';
import { View, Text } from 'react-native';
import tw from '@app/lib/tailwind';

const DashboardTitle = () => {
  return (
    <View style={tw`p-6`}>
      <Text style={tw`text-center text-3xl font-port-slab text-black`}>
        INSURANCE QUOTATION
      </Text>
      <Text style={tw`text-center text-3xl font-port-slab text-black`}>
        GENERATOR
      </Text>
    </View>
  );
};

export default DashboardTitle;
