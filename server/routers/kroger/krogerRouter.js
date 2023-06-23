import express from "express";
import krogerAuthMiddleware from "../../middleware/kroger/krogerAuthMiddleware.js";
import axios from "axios";
import { KROGER_GET_REQUEST_PARAMS } from "../../constants/krogerConstants.js";

const krogerRouter = express.Router();

// Add Kroger API access token before every request
krogerRouter.use(krogerAuthMiddleware);

// GET Kroger locations list
krogerRouter.get("/locations", async (req, res, next) => {
  try {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${req.token}`,
    };
    const response = await axios.request({
      ...KROGER_GET_REQUEST_PARAMS,
      url: "/locations",
      headers: headers,
      params: {
        "filter.chain": "kroger",
        "filter.limit": 10,
      },
    });
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

export default krogerRouter;
