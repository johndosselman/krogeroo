import axios from "axios";
import { BASE_URL, TIMEOUT } from "../../../constants/constants";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

export default api;
