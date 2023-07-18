import getSupabaseToken from "../../supabase/getSupabaseToken";
import sharedConstants from "../../../../server/shared/sharedConstants";
import axios from "axios";
import { QUERY } from "../../constants/constants";

const filterParams = (params) => {
  if (!params) {
    throw new Error("No query parameters provided");
  }
};

// Function to make request to locations endpoint
export const getLocations = async (params) => {
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

export const getLocation = async (params) => {
  try {
    const { locationId } = params;
    if (!locationId) throw new Error("No locationId provided");
    const filteredParams = { locationId };
    const token = await getSupabaseToken();
    // Send request
    const response = await axios.request({
      method: "get",
      baseURL: sharedConstants.BASE_URL,
      url: sharedConstants.ENDPOINTS.LOCATION_SEARCH,
      headers: { Authorization: `Bearer ${token}` },
      params: filteredParams,
    });
    console.log(response);
    const locations = response.data.data;
    return { locations: locations, error: null };
  } catch (error) {
    return { locations: null, error: error };
  }
};
