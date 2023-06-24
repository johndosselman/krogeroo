// Freeze constants recursively
function deepFreeze(object) {
  const propertyNames = Object.getOwnPropertyNames(object);
  for (const name of propertyNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

// Kroger constants
const KROGER = {
  BASE_URL: "https://api.kroger.com/v1",
  // Endpoint urls
  ENDPOINTS: {
    LOCATIONS: "/locations",
    PRODUCTS: "/products",
    TOKEN: "/connect/oauth2/token",
  },
  // Headers and data for kroger token request
  TOKEN_REQUEST: {
    HEADERS: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    DATA: {
      grant_type: "client_credentials",
      scope: "product.compact",
    },
  },
  // Query parameters
  QUERY: {
    // Locations endpoint
    ZIPCODE: "filter.zipCode.near",
    LATLONG: "filter.latLong.near",
    LAT: "filter.lat.near",
    LON: "filter.lon.near",
    RADIUS: "filter.radiusInMiles",
    LIMIT: "filter.limit",
    CHAIN: "filter.chain",
    // Products endpoint
    // TODO: Add query parameters for products endpoint
  },
};

const constants = {
  KROGER,
};

deepFreeze(constants);

export default constants;
