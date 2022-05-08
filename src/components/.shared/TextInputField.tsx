import React from "react";
import { View, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import tw from "@app/lib/tailwind";
import theme from "@app/theme";

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
}

const TextInputField = ({ label, placeholder, value }: TextInputFieldProps) => {
  const [text, onChangeText] = React.useState(value);
  return (
    <View>
      <Text style={tw`text-lg font-thin mb-2`}>{label}</Text>
      <View
        style={{
          marginVertical: 2,
          borderWidth: 0.5,
          padding: 8,
          borderRadius: 6,
        }}
      >
        <TextInput
          style={tw`text-lg font-bold`}
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default TextInputField;
