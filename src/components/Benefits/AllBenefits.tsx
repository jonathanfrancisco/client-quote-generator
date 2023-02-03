import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '@app/lib/tailwind';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import twTheme from '@app/tailwind.config';

import BenefitListCard from './BenefitListCard';
import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';

interface Props {
  navigation: any;
  benefits: IAddableBenefit[];
}

const AllBenefits = ({ navigation, benefits }: Props) => {
  return (
    <ScrollView style={tw`p-6`}>
      <View style={tw`flex-row justify-end mb-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center bg-sunlife-primaryDarker rounded-lg px-6 py-1.5`}
          onPress={() => {
            navigation.navigate('AddBenefit');
          }}>
          <Ionicons
            name="add-outline"
            size={25}
            color="#fff"
            style={tw`ml--1`}
          />
          <Text style={tw`text-white font-bold text-lg`}>Add Benefit</Text>
        </TouchableOpacity>
      </View>

      {benefits.map((benefit) => {
        const benefitTags = [];
        if (benefit.defaultBenefit) {
          benefitTags.push({
            name: 'Default',
            color: twTheme.theme.extend.colors.sunlife.primary,
          });
        }

        if (benefit.value) {
          benefitTags.push({
            name: 'Fixed Coverage Value',
            color: twTheme.theme.extend.colors.sunlife.secondaryAccent,
          });
        }
        return (
          <BenefitListCard
            key={benefit.id}
            benefitName={benefit.name}
            benefitType={benefit.type}
            benefitTags={benefitTags}
          />
        );
      })}
    </ScrollView>
  );
};

export default AllBenefits;
