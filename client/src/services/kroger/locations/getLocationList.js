import api from "../api/api";
import { URL_LOCATIONS } from "../../../constants/constants";
import getSupabaseToken from "../../supabase/getSupabaseToken";

// Function to make request to Kroger locations endpoint
export const getLocationList = async (params) => {
  try {
    const { chain, zipCode, latLong } = params;
    if (!chain) throw new Error("No chain provided");
    if (!zipCode && !latLong) throw new Error("No location provided");
    const filteredParams = { chain, zipCode, latLong };
    const token = await getSupabaseToken();
    const { data } = await api.get(URL_LOCATIONS, {
      params: filteredParams,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { locationList: data, error: null };
  } catch (error) {
    return { locationList: null, error };
  }
};

export default getLocationList;
