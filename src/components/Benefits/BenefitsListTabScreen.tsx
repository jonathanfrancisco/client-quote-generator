import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '@app/lib/tailwind';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import twTheme from '@app/tailwind.config';

import BenefitListCard from './BenefitListCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import IBenefitType from '@app/src/common/enums/benefitType.enum';

interface Props {
  navigation: any;
  benefits: IAddableBenefit[];
}

const BenefitsListTabScreen = ({ benefits, navigation }: Props) => {
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
            onEdit={() => {
              const fixedCoverageValueToggled = !benefit.amount; //  Negate amount e.g true becomes false. Basically, amount here means to state the amount so if value is already fixed then this should be false;
              navigation.navigate('EditBenefit', {
                benefitId: benefit.id,
                benefitName: benefit.name,
                defaultType: benefit.type,
                isDefaultBenefit: benefit.defaultBenefit,
                fixedCoverageValue: fixedCoverageValueToggled,
                benefitDetailsValue: benefit.value,
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default BenefitsListTabScreen;
