import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClientTab from './components/ClientTab';
import BenefitTab from './components/BenefitTab';
import CostTab from './components/CostTab';

import theme from '../../../theme';

const Tab = createMaterialTopTabNavigator();

const CreateQuote = () => {
  return (
    <Tab.Navigator
      initialRouteName='clientTab'
      screenOptions={{
        swipeEnabled: false,
        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {
          backgroundColor: theme.Colors.primary,
          height: 8,
        },
        tabBarStyle: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
        },
        tabBarActiveTintColor: theme.Colors.txtPrimary,
        tabBarInactiveTintColor: theme.Colors.txtPrimary,
      }}
    >
      <Tab.Screen
        name='clientTab'
        component={ClientTab}
        options={{
          tabBarLabel: 'Client',
          tabBarLabelStyle: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name='benefitTab'
        component={BenefitTab}
        options={{
          tabBarLabel: 'Benefit',
          tabBarLabelStyle: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name='costTab'
        component={CostTab}
        options={{
          tabBarLabel: 'Cost',
          tabBarLabelStyle: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 16,
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateQuote;
