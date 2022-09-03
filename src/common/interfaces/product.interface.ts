import ProductCategory from "../enums/ProductCategory.enum";

export default interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  created_at: string;
  updated_at?: string;
  clientQuoteCount: number;
}
