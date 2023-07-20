import axios from "axios";
import constants from "../../constants/constants.js";
import getKrogerHeaders from "../../helpers/getKrogerHeaders.js";
import { RequestError } from "../../shared/errors.js";

// Function to make GET request to Kroger locations/:locationId
const getKrogerLocationData = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    console.log(
      `${constants.KROGER.BASE_URL}${constants.KROGER.ENDPOINTS.LOCATIONS}/${locationId}`
    );
    const headers = getKrogerHeaders(req.token);
    const { data } = await axios.request({
      method: "get",
      baseURL: constants.KROGER.BASE_URL,
      url: `${constants.KROGER.ENDPOINTS.LOCATIONS}/${locationId}`,
      headers: headers,
    });
    res.send(data.data);
  } catch (error) {
    next(new RequestError());
  }
};

export default getKrogerLocationData;
