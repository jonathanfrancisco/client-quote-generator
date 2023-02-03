import tw from '@app/lib/tailwind';
import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AllBenefits from '@app/src/components/Benefits/AllBenefits';
import PrimaryBenefits from '@app/src/components/Benefits/PrimaryBenefits';
import SupplementaryBenefits from '@app/src/components/Benefits/SupplementaryBenefits';
import twTheme from '@app/tailwind.config';
import TextInputField from '@app/src/components/shared/TextInputField';
import Ionicons from '@expo/vector-icons/Ionicons';
import benefitsService from '@app/src/api/services/benefits';
import { useQuery } from '@tanstack/react-query';
import BenefitType from '@app/src/common/enums/benefitType.enum';

const Tab = createMaterialTopTabNavigator();

const Benefits = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading: isAllBenefitsLoading, data: allBenefits } = useQuery({
    queryKey: ['allBenefits'],
    queryFn: () => {
      return benefitsService.getAllBenefits();
    },
    initialData: [],
  });

  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <View
        style={tw`flex-row justify-start justify-between items-center py-2.5`}>
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Text style={tw`text-xl font-bold text-white`}>Benefit List</Text>
        <View style={tw`pr-14`} />
      </View>

      <View
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
        <TextInputField
          label=""
          placeholder="Search"
          value={searchQuery}
          onChangeText={(val) => {
            setSearchQuery(val);
          }}
          icon={<Ionicons name="ios-search" size={20} color="#000" />}
          onBlur={() => {}}
        />
      </View>

      <NavigationContainer independent>
        <Tab.Navigator
          initialRouteName="ALL"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarStyle: {
              backgroundColor: twTheme.theme.extend.colors.sunlife.accent,
              borderBottomColor:
                twTheme.theme.extend.colors.sunlife.secondaryAccent,
              borderBottomWidth: 1,
            },
            tabBarIndicatorStyle: {
              height: 6,
              backgroundColor: twTheme.theme.extend.colors.sunlife.primary,
              marginBottom: -1,
            },
          }}>
          <Tab.Screen
            name="ALL"
            children={() => (
              <AllBenefits
                navigation={navigation}
                benefits={
                  allBenefits.filter((i) => {
                    if (!searchQuery) {
                      return true;
                    }

                    return i.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  }) || []
                }
              />
            )}
          />
          <Tab.Screen
            name="PRIMARY"
            children={() => (
              <PrimaryBenefits
                navigation={navigation}
                benefits={
                  allBenefits!
                    .filter((i) => i.type === BenefitType.PRIMARY)
                    .filter((i) => {
                      if (!searchQuery) {
                        return true;
                      }

                      return i.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    }) || []
                }
              />
            )}
          />
          <Tab.Screen
            name="SUPPLE"
            children={() => (
              <SupplementaryBenefits
                navigation={navigation}
                benefits={
                  allBenefits!
                    .filter((i) => i.type === BenefitType.SUPPLEMENTARY)
                    .filter((i) => {
                      if (!searchQuery) {
                        return true;
                      }

                      return i.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    }) || []
                }
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Benefits;
