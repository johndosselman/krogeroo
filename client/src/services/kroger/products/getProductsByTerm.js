import api from "../api/api";
import { URL_PRODUCTS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";

const getProductsByTerm = async (term) => {
  try {
    if (!term) {
      throw new Error("No term provided");
    }
    const token = await getSupabaseToken();
    const response = await api.get(URL_PRODUCTS, {
      headers: { Authorization: `Bearer ${token}` },
      params: { term },
    });

    console.log(response.data.data);
  } catch (error) {
    // TODO: error handling
    return {};
  }
};

export default getProductsByTerm;
