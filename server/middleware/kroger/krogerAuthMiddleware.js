import getKrogerAuthToken from "../../controllers/kroger/AuthController.js";

// Kroger authentication middleware
const krogerAuthMiddleware = async (req, res, next) => {
  try {
    // Get Kroger API access token
    req.token = getKrogerAuthToken();
    next();
  } catch (error) {
    next(error);
  }
};

export default krogerAuthMiddleware;
