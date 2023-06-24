// Function to freeze objects recursively
function deepFreeze(object) {
  // Get property names of the object
  const propertyNames = Object.getOwnPropertyNames(object);
  // For each property name,
  for (const name of propertyNames) {
    // Get the associated value
    const value = object[name];
    // If the value is an object,
    if (value && typeof value === "object") {
      // Recursively freeze the value and any nested objects
      deepFreeze(value);
    }
  }
  // Freeze and return the object
  return Object.freeze(object);
}

const constants = {
  // Kroger API constants
  // NOTE: Check the Kroger docs @ https://developer.kroger.com/reference/
  // NOTE: consider refactoring
  KROGER: {
    BASE_URL: "https://api.kroger.com/v1",
    // Kroger API endpoints
    ENDPOINTS: {
      LOCATIONS: "/locations",
      PRODUCTS: "/products",
      TOKEN: "/connect/oauth2/token",
    },
    // Kroger token request headers and request data for client credentials grant type
    TOKEN_REQUEST: {
      HEADERS: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      DATA: {
        // Client credentials grant type used for locations and products endpoints
        grant_type: "client_credentials",
        // Scope required for products endpoint
        scope: "product.compact",
        // NOTE: Locations endpoint does not require scope
      },
    },
    // Kroger query parameters
    QUERY: {
      // Shared query parameters
      LIMIT: "filter.limit",
      LOCATION_ID: "filter.locationId",
      // Locations endpoint query parameters
      ZIPCODE: "filter.zipCode.near",
      LATLONG: "filter.latLong.near",
      LAT: "filter.lat.near",
      LON: "filter.lon.near",
      RADIUS: "filter.radiusInMiles",
      CHAIN: "filter.chain",
      DEPARTMENT: "filter.department",
      // Products endpoint query parameters
      TERM: "filter.term",
      PRODUCT_ID: "filter.productId",
      BRAND: "filter.brand",
      FULFILLMENT: "filter.fulfillment",
      START: "filter.start",
    },
  },
};

// Deep freeze constants to prevent modification
deepFreeze(constants);

export default constants;
