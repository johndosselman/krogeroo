import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const requestParams = {
  method: "post",
  baseURL: "https://api.kroger.com/v1",
  url: "/connect/oauth2/token",
  auth: {
    username: process.env.VITE_KROGER_ID,
    password: process.env.VITE_KROGER_SECRET,
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: {
    grant_type: "client_credentials",
    scope: "product.compact",
  },
};

const getKrogerToken = async () => {
  try {
    const result = await axios.request(requestParams);
    return result.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export default getKrogerToken;
