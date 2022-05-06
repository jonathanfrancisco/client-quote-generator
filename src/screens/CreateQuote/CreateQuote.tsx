import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClientTab from "@app/src/components/CreateQuote/ClientTab";
import BenefitTab from "@app/src/components/CreateQuote/BenefitTab";
import CostTab from "@app/src/components/CreateQuote/CostTab";

import theme from "@app/theme";

const Tab = createMaterialTopTabNavigator();

const CreateQuote = () => {
  return (
    <Tab.Navigator initialRouteName="CLIENT_FORM" tabBar={() => null}>
      <Tab.Screen
        name="CLIENT_FORM"
        component={ClientTab}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="BENEFITS_FORM"
        component={BenefitTab}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="COST_FORM"
        component={CostTab}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateQuote;
