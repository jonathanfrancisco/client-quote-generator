import BenefitType from '@app/src/common/enums/benefitType.enum';

export default interface UpdateBenefitRequest {
  params: {
    benefitId: string;
  };
  body: {
    name: string;
    amount: boolean;
    value: string;
    defaultBenefit: boolean;
    type: BenefitType | '';
  };
}
