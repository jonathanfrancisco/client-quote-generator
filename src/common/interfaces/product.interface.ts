import ProductCategory from '../enums/ProductCategory.enum';
import BenefitType from '../enums/benefitType.enum';

interface ProductBenefit {
  benefitId: string;
  type: BenefitType;
  benefitName: string;
  amount: boolean;
  value?: string;
}

export default interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  created_at: string;
  updated_at?: string;
  clientQuoteCount: number;
  productBenefits: ProductBenefit[];
}
