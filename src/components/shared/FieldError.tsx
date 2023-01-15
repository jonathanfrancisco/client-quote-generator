import React from 'react';
import { Text } from 'react-native';

import tw from '@app/lib/tailwind';

interface Props {
  message: string;
}

const FieldError = ({ message }: Props) => {
  return <Text style={tw`text-red-400 font-bold mb-2`}>{message}</Text>;
};

export default FieldError;
