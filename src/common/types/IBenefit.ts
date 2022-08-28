import BenefitType from "./IBenefitType";

export default interface IBenefit {
  id: string;
  type: BenefitType;
  name: string;
  amount: boolean;
  value: string;
  defaultBenefit: boolean;
  isSelected?: boolean;
}
