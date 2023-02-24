import React from 'react';
import { View, Text, ColorValue, TouchableOpacity } from 'react-native';
import tw from '@app/lib/tailwind';
import IBenefitType from '@app/src/common/enums/benefitType.enum';
import BenefitTag from './BenefitTag';

interface IBenefitTag {
  name: string;
  color: ColorValue;
}

interface Props {
  benefitName: string;
  benefitType: IBenefitType;
  benefitTags: IBenefitTag[];
  onEdit: () => void;
}

const BenefitListCard = ({
  benefitName,
  benefitType,
  benefitTags,
  onEdit,
}: Props) => {
  return (
    <View style={tw`my-2 px-6 pt-2 pb-4 bg-white rounded-lg`}>
      <View style={tw`flex-row justify-between items-start`}>
        <Text
          style={{
            flex: 1, // for text wrapping
            flexWrap: 'wrap', // for text wrapping
            ...tw`text-xl font-bold`,
          }}>
          {benefitName}
        </Text>
        <TouchableOpacity
          style={tw`px-6 py-1 mt-1 mb--1 bg-sunlife-secondary rounded-lg`}
          onPress={() => {
            onEdit();
          }}>
          <Text style={tw`text-white text-sm`}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-xs mb-2`}>{benefitType}</Text>
      <View style={tw`flex-row`}>
        {benefitTags.map((bt, index) => (
          <BenefitTag key={index} text={bt.name} color={bt.color} />
        ))}
      </View>
    </View>
  );
};

export default BenefitListCard;
