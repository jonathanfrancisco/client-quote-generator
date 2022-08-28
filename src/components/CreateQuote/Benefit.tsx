import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import Checkbox from "expo-checkbox";
import CurrencyInput from "react-native-currency-input";

import tw from "@app/lib/tailwind";
import twTheme from "@app/tailwind.config";
import IBenefitType from "@app/src/common/types/IBenefitType";

interface Props {
  index: number;
  id: string;
  type: IBenefitType;
  name: string;
  stateAmount: boolean;
  value?: string;
  onSelect: (isSelected: boolean) => void;
}

const Benefit = ({ id, type, name, stateAmount, value, onSelect }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [amount, setAmount] = useState(0);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsSelected(!isSelected);
        onSelect(!isSelected);
      }}
      style={{
        ...tw`my-2 bg-white rounded-xl`,
        elevation: 10,
        shadowColor: "gray",
      }}
    >
      <View style={tw`rounded-lg px-4 pt-2 pb-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg my-2 font-semibold`}>{name}</Text>
          <Checkbox
            value={isSelected}
            style={tw`rounded-full`}
            color={twTheme.theme.extend.colors.sunlife.primaryDarker}
          />
        </View>
        {stateAmount && (
          <View style={tw`flex-row items-center`}>
            <Text>AMOUNT</Text>
            <View style={tw`mx-2`}></View>
            <CurrencyInput
              style={{
                ...tw`text-base pl-2 w-38`,
                borderWidth: 0.8,
              }}
              value={amount}
              onChangeValue={(value) => {
                setAmount(value || 0);
              }}
              prefix="₱"
              delimiter=","
              separator="."
              precision={0}
              placeholderTextColor={
                twTheme.theme.extend.colors.sunlife.secondaryAccent
              }
            />
          </View>
        )}
        {!stateAmount && value && (
          <View>
            <Text>{value}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Benefit;
