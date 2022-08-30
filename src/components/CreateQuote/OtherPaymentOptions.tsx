import tw from "@app/lib/tailwind";
import React from "react";
import { View, Text } from "react-native";

interface Props {
  semiAnnual: number;
  quarterly: number;
  monthly: number;
}

const OtherPaymentOptions = ({ semiAnnual, quarterly, monthly }: Props) => {
  const formatter = Intl.NumberFormat("en-PH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return (
    <View
      style={{
        marginVertical: 2,
        borderWidth: 0.5,
        padding: 8,
        borderRadius: 6,
        marginBottom: 10,
      }}
    >
      <Text style={tw`text-lg font-semibold mb-2`}>OTHER PAYMENT OPTIONS</Text>
      <View>
        <Text style={tw`text-lg`}>
          Semi Annual: ₱{formatter.format(semiAnnual)}
        </Text>
        <Text style={tw`text-lg`}>
          Quarterly: ₱{formatter.format(quarterly)}
        </Text>
        <Text style={tw`text-lg`}>Monthly: ₱{formatter.format(monthly)}</Text>
      </View>
    </View>
  );
};

export default OtherPaymentOptions;
