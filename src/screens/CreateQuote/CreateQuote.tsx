import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

import tw from "@app/lib/tailwind";
import TextInputField from "@app/src/components/.shared/TextInputField";

const CreateQuote = ({ navigation }) => {
  const [step, setStep] = useState(1);
  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <View
        style={tw`flex-row justify-start justify-between items-center py-2.5`}
      >
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />
        <Text style={tw`text-xl font-bold text-white`}>Create Quote</Text>
        <View style={tw`pr-14`}></View>
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}
      >
        <Text style={tw`font-bold text-xl my-4`}>
          Fill the information below.
        </Text>

        {step === 1 && (
          <>
            <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
              <Text style={tw`text-xl font-bold mb-2`}>Client Details</Text>
              <TextInputField label="Name" placeholder="Name" value="" />
            </View>
            <View style={tw`flex-row justify-end mt-4 pb-12`}>
              <TouchableOpacity
                onPress={() => {
                  setStep((prevStepVal) => prevStepVal + 1);
                }}
                style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}
              >
                <Text style={tw`text-center text-white font-bold text-lg`}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
              <Text style={tw`text-xl font-bold mb-2`}>Benefit Details</Text>
              <TextInputField label="Name" placeholder="Name" value="" />
            </View>
            <View style={tw`flex-row justify-between mt-4 pb-12`}>
              <TouchableOpacity
                onPress={() => {
                  setStep((prevStepVal) => prevStepVal - 1);
                }}
                style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}
              >
                <Text style={tw`text-center text-black font-bold text-lg`}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStep((prevStepVal) => prevStepVal + 1);
                }}
                style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}
              >
                <Text style={tw`text-center text-white font-bold text-lg`}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
              <Text style={tw`text-xl font-bold mb-2`}>Cost Details</Text>
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
              <TextInputField
                label="Enter Annual Premium"
                placeholder="Annual Premium"
                value=""
              />
            </View>
            <View style={tw`flex-row justify-between mt-4 pb-12`}>
              <TouchableOpacity
                onPress={() => {
                  setStep((prevStepVal) => prevStepVal - 1);
                }}
                style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}
              >
                <Text style={tw`text-center text-black font-bold text-lg`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateQuote;
