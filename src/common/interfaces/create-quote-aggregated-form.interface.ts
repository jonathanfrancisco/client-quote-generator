import ProductCategory from '../enums/ProductCategory.enum';
import ISelectableBenefit from './selectable-benefit.interface';

export default interface CreateQuoteAggregatedForm {
  // Client Details Form
  name: string;
  gender: string;
  birthday: string;
  smokingHabit: string;
  productCategory: ProductCategory;
  productId: string;
  productName: string;
  productDescription: string;

  // Benefit Details Form
  productPrimaBenefits: ISelectableBenefit[];
  productSuppBenefits: ISelectableBenefit[];

  // Cost Details Form
  annualPremium: number;
  semiAnnual: number;
  quarterly: number;
  monthly: number;
  additionalComment: string;
}
