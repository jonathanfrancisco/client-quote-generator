import React from 'react';
import { View, Text, ColorValue } from 'react-native';
import tw from '@app/lib/tailwind';
import BenefitTag from './BenefitTag';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BenefitType from '@app/src/common/enums/benefitType.enum';

interface BenefitTag {
  name: string;
  color: ColorValue;
}

interface Props {
  benefitName: string;
  benefitType: BenefitType;
  benefitTags: BenefitTag[];
}

const BenefitListCard = ({ benefitName, benefitType, benefitTags }: Props) => {
  return (
    <View style={tw`my-2 px-6 pt-2 pb-4 bg-white rounded-lg`}>
      <View style={tw`flex-row justify-between items-start`}>
        <Text
          style={{
            flex: 1, // for text wrapping
            flexWrap: 'wrap', // for text wrapping
            ...tw`text-2xl font-bold`,
          }}>
          {benefitName}
        </Text>
        <TouchableOpacity
          style={tw`px-6 py-1 mt-1 mb--1 bg-sunlife-secondary rounded-lg`}
          onPress={() => {
            console.log('hello');
          }}>
          <Text style={tw`text-white text-base`}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-lg mb-2`}>{benefitType}</Text>
      <View style={tw`flex-row`}>
        {benefitTags.map((bt, index) => (
          <BenefitTag key={index} text={bt.name} color={bt.color} />
        ))}
      </View>
    </View>
  );
};

export default BenefitListCard;
