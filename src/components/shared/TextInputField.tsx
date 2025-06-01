import React from 'react';
import {
  View,
  Text,
  TextInput,
  TargetedEvent,
  NativeSyntheticEvent,
} from 'react-native';
import tw from '@app/lib/tailwind';
import twTheme from '@app/tailwind.config';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  icon?: JSX.Element;
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  height?: number;
  error?: boolean;
}

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  onBlur,
  height,
  error,
}: Props) => {
  return (
    <View style={tw`my-2`}>
      <Text style={tw`mb-2 text-lg`}>{label}</Text>
      <View
        style={{
          marginVertical: 2,
          borderWidth: error ? 1.5 : 0.5,
          padding: 8,
          paddingLeft: 16,
          borderRadius: 6,
          height,
          borderColor: error ? 'red' : 'black',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <TextInput
          style={tw`text-lg font-bold w-100`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholderTextColor={
            twTheme.theme.extend.colors.sunlife.secondaryAccent
          }
        />
        {icon ? icon : null}
      </View>
    </View>
  );
};

export default TextInputField;
