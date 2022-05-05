import React from "react";
import { View, Text } from "react-native";
import tw from "../../../lib/tailwind";

type Props = {
  count: number;
};

const QuoteCount = ({ count }: Props) => {
  return (
    <View style={tw`items-end px-8 pb-8`}>
      <Text style={tw`text-white font-bold text-5xl`}>{count}</Text>
      <Text style={tw`font-bold text-sm`}>Total Quote</Text>
    </View>
  );
};

export default QuoteCount;
