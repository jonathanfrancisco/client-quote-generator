export interface ExistingClientQuoteRequest {
  id: string;
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
