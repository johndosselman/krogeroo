import getKrogerAuthToken from "../../controllers/kroger/authController.js";

// Kroger authentication middleware
const krogerAuthMiddleware = async (req, res, next) => {
  try {
    // Get Kroger API access token
    req.token = await getKrogerAuthToken();
    next();
  } catch (error) {
    next(error);
  }
};

export default krogerAuthMiddleware;
