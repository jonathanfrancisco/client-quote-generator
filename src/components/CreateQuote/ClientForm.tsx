import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import tw from "@app/lib/tailwind";

import TextInputField from "@app/src/components/.shared/TextInputField";

const ClientForm = ({ navigation }) => {
  return (
    <ScrollView
      style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}
    >
      <Text style={tw`font-bold text-xl my-4`}>
        Fill the information below.
      </Text>
      <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Client Details</Text>
        <TextInputField label="Name" placeholder="Name" value="" />
      </View>
      <View style={tw`flex-row justify-end mt-4 pb-12`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BenefitsForm");
          }}
          style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ClientForm;
