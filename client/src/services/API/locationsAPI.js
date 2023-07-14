import getSupabaseToken from "../../supabase/getSupabaseToken";
import sharedConstants from "../../../../server/shared/sharedConstants";
import axios from "axios";

// Function to make request to locations endpoint
const getLocations = async (params) => {
  try {
    // Get client authentication token
    const token = await getSupabaseToken();
    const headers = { Authorization: `Bearer ${token}` };
    const request = {
      method: "get",
      baseURL: sharedConstants.BASE_URL,
      url: sharedConstants.ENDPOINTS.LOCATION_SEARCH,
      headers: headers,
      params: params,
    };
    // Send request
    const response = await axios.request(request);
    const locations = response.data.data;
    return { locations: locations, error: null };
  } catch (error) {
    return { locations: null, error: error };
  }
};

export default getLocations;
