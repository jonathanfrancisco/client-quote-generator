import ProductCategory from "@app/src/common/enums/ProductCategory.enum";
import Product from "@app/src/common/interfaces/product.interface";
import axios from "./axios";

const getProductsByCategory = async (
  prodCategory: ProductCategory
): Promise<Product[]> => {
  try {
    const response = await axios.get(`/api/products/${prodCategory}`);
    return response?.data.results;
  } catch (err) {
    console.log("error: ", err);
    return [];
  }
};

export default {
  getProductsByCategory,
};
