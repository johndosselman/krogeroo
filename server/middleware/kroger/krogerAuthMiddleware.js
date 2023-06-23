import axios from "axios";
import dotenv from "dotenv";
import { KROGER_TOKEN_REQUEST_PARAMS } from "../../constants/krogerConstants.js";

dotenv.config();

const krogerAuthMiddleware = async (req, res, next) => {
  console.log("getting kroger token");
  try {
    const response = await axios.request({
      ...KROGER_TOKEN_REQUEST_PARAMS,
      auth: {
        username: process.env.VITE_KROGER_ID,
        password: process.env.VITE_KROGER_SECRET,
      },
    });
    req.token = response.data.access_token;
    next();
  } catch (error) {
    next(new Error("kroger auth error"));
  }
};

export default krogerAuthMiddleware;
