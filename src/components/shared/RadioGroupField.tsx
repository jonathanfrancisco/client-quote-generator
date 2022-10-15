import React from 'react';
import { RadioButton } from 'react-native-radio-buttons-group';
import { Text, View } from 'react-native';

import tw from '@app/lib/tailwind';

interface RadioButtonValue {
  id: string;
  value: string;
  label?: string;
}
interface Props {
  label?: string;
  items: RadioButtonValue[];
  picked: string;
  onChange: (text: string) => void;
}

const RadioGroupField = ({ label, items, picked, onChange }: Props) => {
  return (
    <View style={tw`mb-4`}>
      {label ? <Text style={tw`text-lg font-thin mb-2`}>{label}</Text> : null}
      <View style={tw`flex-row`}>
        {items.map((i) => {
          const isSelected = i.value === picked;
          return (
            <RadioButton
              key={i.id}
              labelStyle={tw`text-black text-lg`}
              color="black"
              borderColor="color"
              size={18}
              id={i.id}
              value={i.value}
              label={i.label}
              selected={isSelected}
              onPress={(selectedId) => {
                const selectedValue = items.find(
                  (i) => i.id === selectedId
                )?.value;
                onChange(selectedValue || '');
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RadioGroupField;
