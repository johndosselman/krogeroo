// NOTE: Kroger API docs @ https://developer.kroger.com/reference/#operation/productGet

import axios from "axios";
import { RequestError } from "../../shared/errors.js";
import constants from "../../constants/constants.js";
import sharedConstants from "../../shared/sharedConstants.js";

// Function to get headers for product request using Kroger API auth token
const getHeaders = (token) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

// Function to get query parameters for product request
// NOTE: consider refactor
const getProductQueryParams = (query) => {
  const {
    [sharedConstants.QUERY.LIMIT]: limit,
    [sharedConstants.QUERY.LOCATION_ID]: locationId,
    [sharedConstants.QUERY.TERM]: term,
    [sharedConstants.QUERY.PRODUCT_ID]: productId,
    [sharedConstants.QUERY.BRAND]: brand,
    [sharedConstants.QUERY.FULFILLMENT]: fulfillment,
    [sharedConstants.QUERY.START]: start,
  } = query;
  const params = {};
  // Add limit to maximum number of products returned
  if (limit) {
    params[constants.KROGER.QUERY.LIMIT] = limit;
  }
  // Filter by location ID
  if (locationId) {
    params[constants.KROGER.QUERY.LOCATION_ID] = locationId;
  }
  // Filter by search term
  // NOTE: Max 8 words separated by space
  if (term) {
    params[constants.KROGER.QUERY.TERM] = term;
  }
  // Filter by product ID
  // NOTE: If product ID filter is used, all other filters are ignored
  if (productId) {
    params[constants.KROGER.QUERY.PRODUCT_ID] = productId;
  }
  // Filter by brand
  //NOTE: Case sensitive
  if (brand) {
    params[constants.KROGER.QUERY.BRAND] = brand;
  }
  // Filter by available fulfillment types (i.e. Available in store, curbside pickup, etc)
  if (fulfillment) {
    params[constants.KROGER.QUERY.FULFILLMENT] = fulfillment;
  }
  // Skip a given number of products
  if (start) {
    params[constants.KROGER.QUERY.START] = start;
  }
  return params;
};

// Function to get list of products from Kroger "/products" endpoint
const getProducts = async (req, res, next) => {
  try {
    // Get headers
    const headers = getHeaders(req.token);
    // Get parameters
    const params = getProductQueryParams(req.query);
    // Make GET request to Kroger API
    const response = await axios.request({
      method: "get",
      baseURL: constants.KROGER.BASE_URL,
      url: constants.KROGER.ENDPOINTS.PRODUCTS,
      headers: headers,
      params: params,
    });
    // Send response data to the client
    // NOTE: Implement product model
    res.send(response.data);
  } catch (error) {
    // Request error upon failed request
    next(new RequestError());
  }
};

export default getProducts;
