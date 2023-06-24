// NOTE: Kroger API docs @ https://developer.kroger.com/reference/#operation/SearchLocations

import axios from "axios";
import constants from "../../constants/constants.js";
import { RequestError } from "../../../shared/errors.js";

// Function to get headers for Kroger locations endpoint request
const getHeaders = (token) => ({
  Accept: "application/json",
  // Use bearer authentication with provided token
  Authorization: `Bearer ${token}`,
});

// Function to get query parameters for Kroger locations endpoint request
const getLocationsQueryParams = (query) => {
  const { zipCode, latLong, lat, lon, radius, limit, chain } = query;
  const params = {};
  // Specify zipcode, latlong, or latitude and longitude as point of origin
  if (zipCode) {
    params[constants.KROGER.QUERY.ZIPCODE] = zipCode;
  } else if (latLong) {
    params[constants.KROGER.QUERY.LATLONG] = latLong;
  } else if (lat && lon) {
    params[constants.KROGER.QUERY.LAT] = lat;
    params[constants.KROGER.QUERY.LON] = lon;
  }
  // Specify maximum search radius to point of origin (in miles)
  if (radius) {
    params[constants.KROGER.QUERY.RADIUS] = radius;
  }
  // Specify maximum number of results
  if (limit) {
    params[constants.KROGER.QUERY.LIMIT] = limit;
  }
  // Specify chain (i.e. Kroger, Frys, etc.)
  if (chain) {
    params[constants.KROGER.QUERY.CHAIN] = chain;
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
    // Throw request error upon failure
    next(new RequestError());
  }
};

export default getKrogerLocations;
