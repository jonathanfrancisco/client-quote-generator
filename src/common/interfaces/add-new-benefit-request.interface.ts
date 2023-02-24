import BenefitType from '@app/src/common/enums/benefitType.enum';

export default interface AddNewBenefitRequest {
  name: string;
  amount: boolean;
  value: string;
  defaultBenefit: boolean;
  type: BenefitType | '';
}
