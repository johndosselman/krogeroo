import axios from "axios";
import dotenv from "dotenv";

import { KrogerAuthError } from "../../../shared/errors.js";
import constants from "../../constants/constants.js";

dotenv.config();

const krogerAuthMiddleware = async (req, res, next) => {
  try {
    const response = await axios.request({
      method: "post",
      baseURL: constants.KROGER.BASE_URL,
      url: constants.KROGER.ENDPOINTS.TOKEN,
      headers: constants.KROGER.TOKEN_REQUEST.HEADERS,
      data: constants.KROGER.TOKEN_REQUEST.DATA,
      auth: {
        username: process.env.VITE_KROGER_ID,
        password: process.env.VITE_KROGER_SECRET,
      },
    });

    req.token = response.data.access_token;
    next();
  } catch (error) {
    next(new KrogerAuthError());
  }
};

export default krogerAuthMiddleware;
