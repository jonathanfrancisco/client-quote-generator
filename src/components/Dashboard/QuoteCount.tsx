import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from '@app/lib/tailwind';

type Props = {
  count: number;
  isLoading: boolean;
};

const QuoteCount = ({ count, isLoading }: Props) => {
  if (isLoading) {
    return (
      <View style={tw`items-end px-8 pb-8`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={tw`items-end px-8 pb-8`}>
      <Text style={tw`text-white font-extrabold text-6xl`}>{count}</Text>
      <Text style={tw`font-bold text-sm text-black`}>Total Quote</Text>
    </View>
  );
};

export default QuoteCount;
