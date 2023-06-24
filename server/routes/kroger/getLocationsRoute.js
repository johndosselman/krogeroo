import axios from "axios";
import getHeaders from "../../helpers/kroger/getHeaders.js";
import getLocationsQueryParams from "../../helpers/kroger/getLocationsQueryParams.js";
import constants from "../../constants/constants.js";

const getLocationsRoute = async (req, res, next) => {
  try {
    // Get the query parameters
    const params = getLocationsQueryParams(req.query);
    // Get the headers
    const headers = getHeaders(req.token);
    // Send axios GET request
    const response = await axios.request({
      method: "get",
      baseURL: constants.KROGER.BASE_URL,
      url: constants.KROGER.ENDPOINTS.LOCATIONS,
      headers: headers,
      params: params,
    });
    // Send the response data to the client
    // TODO: Implement controller
    res.send(response.data);
  } catch (error) {
    next(error);
  }
};

export default getLocationsRoute;
