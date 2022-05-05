import React from "react";
import { View, Text } from "react-native";
import { colors, Input } from "react-native-elements";
import theme from "../../../theme";
import TextInputField from "../.shared/TextInputField";

const ClientDetailsForm = () => {
  return (
    <View
      style={{
        padding: 24,
        backgroundColor: theme.Colors.secondary,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          fontSize: 21,
          fontWeight: "bold",
        }}
      >
        Client Details
      </Text>
      <TextInputField label="Name" placeholder="Name" />
      <TextInputField label="Birthday" placeholder="Birthday" />
    </View>
  );
};

export default ClientDetailsForm;
