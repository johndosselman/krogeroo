import api from "../api/api";
import { URL_PRODUCTS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";
import Product from "../../../classes/product";

const getSearchProducts = async ({ term, locationId }) => {
  try {
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
    const searchProducts = data.map((productData) => new Product(productData));
    return { searchProducts, error: null };
  } catch (error) {
    // TODO: error handling
    return { searchProducts: null, error };
  }
};

export default getSearchProducts;
