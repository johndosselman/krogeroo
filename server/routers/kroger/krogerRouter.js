import express from "express";
import krogerAuthMiddleware from "../../middleware/kroger/krogerAuthMiddleware.js";
import getLocationsRoute from "../../routes/kroger/getLocationsRoute.js";

const krogerRouter = express.Router();

// Add Kroger API access token before every request
krogerRouter.use(krogerAuthMiddleware);

// handle GET locations request
krogerRouter.get("/locations", getLocationsRoute);

export default krogerRouter;
