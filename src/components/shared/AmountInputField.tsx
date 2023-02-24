import React from 'react';
import { View, Text, TargetedEvent, NativeSyntheticEvent } from 'react-native';
import tw from '@app/lib/tailwind';
import twTheme from '@app/tailwind.config';
import CurrencyInput from 'react-native-currency-input';

interface Props {
  label: string;
  value: number;
  onChangeValue: (amount: string) => void;
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  height?: number;
  error?: boolean;
}

const AmountInputField = ({
  label,
  value,
  onChangeValue,
  onBlur,
  height,
  error,
}: Props) => {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>{label}</Text>
      <View
        style={{
          marginVertical: 2,
          borderWidth: error ? 1.5 : 0.5,
          padding: 8,
          borderRadius: 6,
          height: height,
          borderColor: error ? 'red' : 'black',
        }}>
        <CurrencyInput
          style={tw`text-lg font-bold`}
          value={value}
          onChangeValue={(value: number) => {
            onChangeValue(value?.toString() || '0');
          }}
          onBlur={onBlur}
          prefix="₱"
          delimiter=","
          separator="."
          precision={0}
        />
      </View>
    </View>
  );
};

export default AmountInputField;
