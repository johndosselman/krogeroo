import api from "../api/api";
import { URL_PRODUCTS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";
import Product from "../../../models/productModel";

const getProductsByIds = async ({ productIds, locationId }) => {
  try {
    if (!productIds) {
      throw new Error("No product ids provided");
    }
    if (!locationId) {
      throw new Error("No locationId provided");
    }
    const joinedProductIds = productIds.join(",");
    const token = await getSupabaseToken();
    const { data } = await api.get(URL_PRODUCTS, {
      headers: { Authorization: `Bearer ${token}` },
      params: { locationId, productId: joinedProductIds },
    });
    const products = data.map((productData) => new Product(productData));
    return { products, error: null };
  } catch (error) {
    // TODO: error handling
    return { products: null, error };
  }
};

export default getProductsByIds;
