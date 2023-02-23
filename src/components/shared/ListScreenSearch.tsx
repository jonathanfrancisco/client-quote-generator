import { View } from 'react-native';
import tw from '@app/lib/tailwind';
import TextInputField from '@app/src/components/shared/TextInputField';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

const ListScreenSearch = ({ placeholder, value, onChange }: Props) => {
  return (
    <View style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
      <TextInputField
        label=""
        placeholder={placeholder}
        value={value}
        onChangeText={(val) => {
          onChange(val);
        }}
        icon={<Ionicons name="ios-search" size={20} color="#000" />}
        onBlur={() => {}}
      />
    </View>
  );
};

export default ListScreenSearch;
