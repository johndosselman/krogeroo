import express from "express";
import krogerAuthMiddleware from "../../middleware/kroger/krogerAuthMiddleware.js";
import getKrogerLocations from "../../controllers/kroger/LocationsController.js";
import getProducts from "../../controllers/kroger/ProductsController.js";

const krogerRouter = express.Router();

// Add Kroger API access token before every request
krogerRouter.use(krogerAuthMiddleware);

// Handle GET locations request
krogerRouter.get("/locations", getKrogerLocations);

// Handle GET products request
krogerRouter.get("/products", getProducts);

export default krogerRouter;
