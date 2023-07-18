import getSupabaseToken from "../../supabase/getSupabaseToken";
import sharedConstants from "../../../../server/shared/sharedConstants";
import axios from "axios";

// Function to make request to locations endpoint
const getLocations = async (params) => {
  try {
    const { chain, zipCode, latLong } = params;
    if (!chain) throw new Error("No chain provided");
    if (!zipCode && !latLong) throw new Error("No location provided");
    // Filter params
    const filteredParams = { chain, zipCode, latLong };
    // Get client authentication token
    const token = await getSupabaseToken();
    // Send request
    const response = await axios.request({
      method: "get",
      baseURL: sharedConstants.BASE_URL,
      url: sharedConstants.ENDPOINTS.LOCATION_SEARCH,
      headers: { Authorization: `Bearer ${token}` },
      params: filteredParams,
    });
    const locations = response.data.data;
    return { locations: locations, error: null };
  } catch (error) {
    return { locations: null, error: error };
  }
};

export default getLocations;
