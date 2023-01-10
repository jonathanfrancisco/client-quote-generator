import React from 'react';
import { View, Text, ColorValue } from 'react-native';
import tw from '@app/lib/tailwind';

interface Props {
  text: string;
  color: ColorValue;
}

const BenefitTag = ({ text, color }: Props) => {
  return (
    <View
      style={{
        ...tw`border rounded-full px-4 py-[0.8] mr-2`,
        borderColor: color,
      }}>
      <Text
        style={{
          ...tw`text-sm`,
          color,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default BenefitTag;
