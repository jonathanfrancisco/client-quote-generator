export interface NewClientQuoteRequest {
  name: string;
  gender: string;
  birthday: string;
  smokingHabit: string;
  productId: string;
  clientBenefit: {
    benefitId: string;
    type: string;
    amount: string;
  }[];
  additionalComment: string;
  annualPremium: number;
}
