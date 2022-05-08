import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderBackButton } from "@react-navigation/elements";
import tw from "@app/lib/tailwind";

import ClientForm from "@app/src/components/CreateQuote/ClientForm";
import BenefitTab from "@app/src/components/CreateQuote/BenefitTab";
import CostTab from "@app/src/components/CreateQuote/CostTab";

const Tab = createMaterialTopTabNavigator();

const CreateQuote = ({ navigation }) => {
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
      <Tab.Navigator
        initialRouteName="ClientForm"
        tabBar={() => null}
        sceneContainerStyle={tw`bg-sunlife-primary`}
      >
        <Tab.Screen
          name="ClientForm"
          component={ClientForm}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen
          name="BenefitsForm"
          component={BenefitTab}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen
          name="CostForm"
          component={CostTab}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default CreateQuote;
