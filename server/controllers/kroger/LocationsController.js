import axios from "axios";
import constants from "../../constants/constants.js";

// Function to get headers for Kroger locations endpoint request
const getHeaders = (token) => ({
  Accept: "application/json",
  // Use bearer authentication with provided token
  Authorization: `Bearer ${token}`,
});

// Function to get query parameters for Kroger locations endpoint request
const getLocationsQueryParams = (query) => {
  const params = {};

  const entries = Object.entries(query);

  // Specify zipcode, latlong, or latitude and longitude as point of origin
  if (query.zipCode) {
    params[constants.KROGER.QUERY.ZIPCODE] = query.zipCode;
  } else if (query.latLong) {
    params[constants.KROGER.QUERY.LATLONG] = query.latLong;
  } else if (query.lat && query.lon) {
    params[constants.KROGER.QUERY.LAT] = query.lat;
    params[constants.KROGER.QUERY.LON] = query.lon;
  }
  // Specify maximum search radius to point of origin (in miles)
  if (query.radius) {
    params[constants.KROGER.QUERY.RADIUS] = query.radius;
  }
  // Specify maximum number of results
  if (query.limit) {
    params[constants.KROGER.QUERY.LIMIT] = query.limit;
  }
  // Specify chain (i.e. Kroger, Frys, etc.)
  if (query.chain) {
    params[constants.KROGER.QUERY.CHAIN] = query.chain;
  }
  // Return query parameters
  return params;
};

// Make GET request to the Kroger locations endpoint
const getKrogerLocations = async (req, res, next) => {
  try {
    // Get the query parameters
    const params = getLocationsQueryParams(req.query);
    // Get the headers using provided token
    const headers = getHeaders(req.token);
    // Send the request
    const response = await axios.request({
      method: "get",
      baseURL: constants.KROGER.BASE_URL,
      url: constants.KROGER.ENDPOINTS.LOCATIONS,
      headers: headers,
      params: params,
    });
    // Send the response data to the client
    // TODO: Implement locations model
    res.send(response.data);
  } catch (error) {
    next(error);
  }
};

export default getKrogerLocations;
