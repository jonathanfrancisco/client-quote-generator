import BenefitType from '../enums/benefitType.enum';

export default interface IAddableBenefit {
  id: string;
  name: string;
  amount: boolean;
  value: string;
  defaultBenefit: boolean;
  type: BenefitType;
}
