import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker, { ListModeType } from 'react-native-dropdown-picker';
import tw from '@app/lib/tailwind';

interface ListItem {
  label: string;
  value: string;
}

interface Props {
  listMode?: ListModeType;
  label?: string;
  placeholder: string;
  items: ListItem[];
  picked: string;
  onChange: (text: string) => void;
}

const DropDownList = ({
  listMode = 'SCROLLVIEW',
  label,
  placeholder,
  items,
  picked,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={tw`mb-4`}>
      {label ? <Text style={tw`text-lg mb-2`}>{label}</Text> : null}
      <DropDownPicker
        listMode={listMode}
        style={{
          borderWidth: 0.5,
        }}
        textStyle={tw`text-lg`}
        placeholder={placeholder}
        open={open}
        value={picked}
        items={items}
        setOpen={setOpen}
        setValue={(getSelectedValue) => {
          const selectedvalue = getSelectedValue(picked);
          onChange(selectedvalue);
        }}
      />
    </View>
  );
};

export default DropDownList;
