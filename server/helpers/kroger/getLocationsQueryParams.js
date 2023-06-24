import constants from "../../constants/constants.js";

const getLocationsQueryParams = (query) => {
  const params = {};

  if (query.zipCode) {
    params[constants.KROGER.QUERY.ZIPCODE] = query.zipCode;
  } else if (query.latLong) {
    params[constants.KROGER.QUERY.LATLONG] = query.latLong;
  } else if (query.lat && query.lon) {
    params[constants.KROGER.QUERY.LAT] = query.lat;
    params[constants.KROGER.QUERY.LON] = query.lon;
  }
  if (query.radius) {
    params[constants.KROGER.QUERY.RADIUS] = query.radius;
  }
  if (query.limit) {
    params[constants.KROGER.QUERY.LIMIT] = query.limit;
  }
  if (query.chain) {
    params[constants.KROGER.QUERY.CHAIN] = query.chain;
  }

  return params;
};

export default getLocationsQueryParams;
