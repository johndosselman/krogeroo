const BASE_URL = "https://api.kroger.com/v1";

// Kroger API access token request parameters
// NOTE: Before request, add auth using env variables
export const KROGER_TOKEN_REQUEST_PARAMS = {
  method: "post",
  baseURL: BASE_URL,
  url: "/connect/oauth2/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: {
    grant_type: "client_credentials",
    scope: "product.compact",
  },
};

// Kroger API generic GET request parameters
// NOTE: Before request, add headers
export const KROGER_GET_REQUEST_PARAMS = {
  method: "get",
  baseURL: BASE_URL,
};
