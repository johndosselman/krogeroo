import express from "express";
import krogerRouter from "../kroger/krogerRouter.js";

// Demo router. For demonstration purposes only
const demoRouter = express.Router();

// Access kroger API without client authentication
demoRouter.use("/kroger", krogerRouter);

export default demoRouter;
