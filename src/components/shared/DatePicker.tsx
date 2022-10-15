import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TargetedEvent,
  NativeSyntheticEvent,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import tw from '@app/lib/tailwind';
import twTheme from '@app/tailwind.config';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  error?: boolean;
}

const DatePicker = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
}: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    type StringOrNum = string | number;
    let mm: StringOrNum = date.getMonth() + 1; // Months start at 0!
    let dd: StringOrNum = date.getDate();
    const yyyy = date.getFullYear();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    onChangeText(mm + '/' + dd + '/' + yyyy);
    hideDatePicker();
  };

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-lg font-thin mb-2`}>{label}</Text>
      <View
        style={{
          marginVertical: 2,
          borderWidth: error ? 1.5 : 0.5,
          padding: 8,
          borderRadius: 6,
          borderColor: error ? 'red' : 'black',
        }}>
        <TextInput
          style={tw`text-lg font-bold`}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          placeholderTextColor={
            twTheme.theme.extend.colors.sunlife.secondaryAccent
          }
          onPressIn={showDatePicker}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;
