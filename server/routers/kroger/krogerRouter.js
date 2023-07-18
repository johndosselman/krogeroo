import express from "express";
import krogerAuthMiddleware from "../../middleware/kroger/krogerAuthMiddleware.js";
import getKrogerLocations from "../../controllers/kroger/locationsController.js";
import getProducts from "../../controllers/kroger/productsController.js";
import getKrogerLocationData from "../../controllers/kroger/locationDataController.js";

const krogerRouter = express.Router();

// Add Kroger API access token before every request
krogerRouter.use(krogerAuthMiddleware);

krogerRouter.get("/locations", getKrogerLocations);

krogerRouter.get("/locations/:locationId", getKrogerLocationData);

krogerRouter.get("/products", getProducts);

export default krogerRouter;
