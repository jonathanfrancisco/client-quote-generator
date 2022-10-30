import BenefitType from '../enums/benefitType.enum';

export default interface ISelectableBenefit {
  benefitId: string;
  type: BenefitType;
  benefitName: string;
  amount: boolean;
  value: string;
  isSelected: boolean;
}
