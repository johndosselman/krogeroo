import axios from "axios";
import getSupabaseToken from "../../../supabase/getSupabaseToken";
import sharedConstants from "../../../../../server/shared/sharedConstants";

const getLocationData = async (params) => {
  try {
    const { locationId } = params;
    if (!locationId) throw new Error("No locationId provided");
    const token = await getSupabaseToken();
    // Send request
    const response = await axios.request({
      method: "get",
      baseURL: sharedConstants.BASE_URL,
      url: `${sharedConstants.ENDPOINTS.LOCATION_SEARCH}/${locationId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    const location = response.data.data;
    return { location: location, error: null };
  } catch (error) {
    return { location: null, error: error };
  }
};

export default getLocationData;
