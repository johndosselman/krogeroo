import deepFreeze from "./deepFreeze.js";

const sharedConstants = {
  BASE_URL: "/api/v1/kroger",
  ENDPOINTS: {
    LOCATION_SEARCH: "/locations",
    PRODUCT_SEARCH: "/products",
  },
  QUERY: {
    // Shared endpoint query parameters
    LIMIT: "limit",
    LOCATION_ID: "locationId",
    // Locations endpoint query parameters
    ZIPCODE: "zipCode",
    LATLONG: "latLong",
    LAT: "lat",
    LON: "lon",
    RADIUS: "radius",
    CHAIN: "chain",
    // Products endpoint query parameters
    TERM: "term",
    PRODUCT_ID: "productId",
    BRAND: "brand",
    FULFILLMENT: "fulfillment",
    START: "start",
  },
};

deepFreeze(sharedConstants);
export default sharedConstants;
