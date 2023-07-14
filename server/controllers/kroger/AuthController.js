// Note: See the Kroger client access token docs @ https://developer.kroger.com/reference/#operation/accessToken

import axios from "axios";
import dotenv from "dotenv";
import { KrogerAuthError } from "../../shared/errors.js";
import constants from "../../constants/constants.js";

// Load environent variables
dotenv.config();

// Function to retrieve Kroger API access token
const getKrogerAuthToken = async () => {
  try {
    // Make a POST request to the Kroger auth endpoint
    const response = await axios.request({
      method: "post",
      baseURL: constants.KROGER.BASE_URL,
      url: constants.KROGER.ENDPOINTS.TOKEN,
      headers: constants.KROGER.TOKEN_REQUEST.HEADERS,
      data: constants.KROGER.TOKEN_REQUEST.DATA,
      // Use basic auth with environment variables
      auth: {
        username: process.env.VITE_KROGER_ID,
        password: process.env.VITE_KROGER_SECRET,
      },
    });
    // Return the Kroger API acccess token upon successful response
    return response.data.access_token;
  } catch (error) {
    // Throw KrogerAuthError if an error occurs during request
    throw new KrogerAuthError();
  }
};

export default getKrogerAuthToken;
