import api from "../api/api";
import { URL_PRODUCTS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";

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
    return { products: data, error: null };
  } catch (error) {
    // TODO: error handling
    return { products: null, error };
  }
};

export default getProductsByTerm;
