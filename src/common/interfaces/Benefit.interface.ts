import BenefitType from "../enums/BenefitType.enum";

export default interface IBenefit {
  id: string;
  type: BenefitType;
  name: string;
  amount: boolean;
  value: string;
  defaultBenefit: boolean;
  isSelected?: boolean;
}
