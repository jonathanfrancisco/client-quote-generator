import React from 'react';
import { Input } from 'react-native-elements';
import theme from '../../../theme';

interface TextInputFieldProps {
  label: string;
  placeholder: string;
}

const TextInputField = (props: TextInputFieldProps) => {
  return (
    <Input
      label={props.label}
      labelStyle={{
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.Colors.txtPrimary,
      }}
      placeholder={props.placeholder}
      placeholderTextColor={theme.Colors.txtAccent}
      inputStyle={{
        fontSize: 16,
        backgroundColor: theme.Colors.backgroundPrimary,
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
      inputContainerStyle={{
        borderBottomWidth: 0,
      }}
    />
  );
};

export default TextInputField;
