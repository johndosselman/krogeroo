import api from "../api/api";
import { URL_PRODUCTS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";
import Product from "../../../models/productModel";

const getProductsByTerm = async (params) => {
  try {
    const { term, locationId } = params;
    if (!term) {
      throw new Error("No term provided");
    }
    if (!locationId) {
      throw new Error("No locationId provided");
    }
    const token = await getSupabaseToken();
    const { data } = await api.get(URL_PRODUCTS, {
      headers: { Authorization: `Bearer ${token}` },
      params: { term, limit: 50, locationId },
    });
    const products = data.map((productData) => new Product(productData));
    return { products, error: null };
  } catch (error) {
    // TODO: error handling
    return { products: null, error };
  }
};

export default getProductsByTerm;
