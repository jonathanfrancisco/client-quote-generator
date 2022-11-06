import ProductCategory from '@app/src/common/enums/ProductCategory.enum';
import Product from '@app/src/common/interfaces/product.interface';

import axios from './axios';

const getProductsByCategory = async (
  prodCategory: ProductCategory
): Promise<Product[]> => {
  try {
    const response = await axios.get(`/api/products/${prodCategory}`);
    return response.data.result;
  } catch (err: any) {
    return [];
  }
};

const getProductById = async (id: string): Promise<Nullable<Product>> => {
  try {
    const response = await axios.get(`/api/product/${id}`);

    const product = response?.data.result as Product;

    // TODO: Remove this once amount is added on the API response
    product.productBenefits = product.productBenefits.map((i) => {
      return {
        ...i,
        value: i.value === '' ? '0' : i.value,
      };
    });

    return product;
  } catch (err) {
    console.log('error: ', err);
    return undefined;
  }
};

export default {
  getProductsByCategory,
  getProductById,
};
