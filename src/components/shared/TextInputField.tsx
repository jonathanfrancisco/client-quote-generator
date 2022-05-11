import React from "react";
import {
  View,
  Text,
  TextInput,
  TargetedEvent,
  NativeSyntheticEvent,
} from "react-native";
import tw from "@app/lib/tailwind";
import twTheme from "@app/tailwind.config";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  height?: number;
  error?: boolean;
}

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  height,
  error,
}: Props) => {
  return (
    <View>
      <Text style={tw`text-lg font-thin my-2`}>{label}</Text>
      <View
        style={{
          marginVertical: 2,
          borderWidth: error ? 1.5 : 0.5,
          padding: 8,
          borderRadius: 6,
          height: height,
          borderColor: error ? "red" : "black",
        }}
      >
        <TextInput
          style={tw`text-lg font-bold`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholderTextColor={
            twTheme.theme.extend.colors.sunlife.secondaryAccent
          }
        />
      </View>
    </View>
  );
};

export default TextInputField;
