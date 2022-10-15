import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import tw from '@app/lib/tailwind';

const GenerateQuoteButton = () => {
  return (
    <TouchableOpacity
      style={tw`px-8 py-4 my-2 bg-sunlife-secondary rounded-xl`}>
      <Text style={tw`text-xl text-white text-center font-semibold`}>
        Generate Quote
      </Text>
    </TouchableOpacity>
  );
};

export default GenerateQuoteButton;
