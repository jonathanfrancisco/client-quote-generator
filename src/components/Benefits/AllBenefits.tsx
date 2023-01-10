import React from 'react';
import { ScrollView } from 'react-native';
import tw from '@app/lib/tailwind';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import twTheme from '@app/tailwind.config';

import BenefitListCard from './BenefitListCard';

interface Props {
  navigation: any;
  benefits: IAddableBenefit[];
}

const AllBenefits = ({ navigation, benefits }: Props) => {
  return (
    <ScrollView style={tw`p-6`}>
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
