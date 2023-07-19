export const CHAINS = {
  KROGER: "KROGER",
  MARIANOS: "MARIANOS",
  FRYS: "FRYS",
};

export const QUERY = {
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
};

export const BASE_URL = "/api/v1/kroger";

export const URL_LOCATIONS = "/locations";

export const URL_PRODUCTS = "/products";

export const TIMEOUT = 5000;
