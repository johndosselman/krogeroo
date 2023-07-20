import getSupabaseToken from "../../supabase/getSupabaseToken";
import api from "../api/api";
import { URL_LOCATIONS } from "../../../constants/constants";

const getLocationData = async (params) => {
  try {
    const { locationId } = params;
    if (!locationId) throw new Error("No locationId provided");
    const token = await getSupabaseToken();
    // Send request
    const { data } = await api.get(`${URL_LOCATIONS}/${locationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { location: data, error: null };
  } catch (error) {
    return { location: null, error };
  }
};

export default getLocationData;
