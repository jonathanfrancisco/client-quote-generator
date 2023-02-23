import tw from '@app/lib/tailwind';
import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import twTheme from '@app/tailwind.config';
import benefitsService from '@app/src/api/services/benefits';
import { useQuery } from '@tanstack/react-query';
import BenefitType from '@app/src/common/enums/benefitType.enum';
import BenefitsListTabScreen from '@app/src/components/Benefits/BenefitsListTabScreen';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import ListScreenSearch from '@app/src/components/shared/ListScreenSearch';

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

  const filterBySearchQuery = (benefits: IAddableBenefit[]) => {
    return benefits.filter((i) => {
      if (!searchQuery) {
        return true;
      }
      return i.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const filteredAllBenefits = filterBySearchQuery(allBenefits!);
  const filteredPrimBenefits = filterBySearchQuery(allBenefits!).filter(
    (i) => i.type === BenefitType.PRIMARY
  );
  const filteredSuppBenefits = filterBySearchQuery(allBenefits!).filter(
    (i) => i.type === BenefitType.SUPPLEMENTARY
  );

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

      <ListScreenSearch
        placeholder="Search"
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
        }}
      />

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
              <BenefitsListTabScreen
                navigation={navigation}
                benefits={filteredAllBenefits}
              />
            )}
          />
          <Tab.Screen
            name="PRIMARY"
            children={() => (
              <BenefitsListTabScreen
                navigation={navigation}
                benefits={filteredPrimBenefits}
              />
            )}
          />
          <Tab.Screen
            name="SUPPLE"
            children={() => (
              <BenefitsListTabScreen
                navigation={navigation}
                benefits={filteredSuppBenefits}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Benefits;
