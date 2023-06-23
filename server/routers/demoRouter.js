import express from "express";
import krogerRouter from "./kroger/krogerRouter.js";

// Demo router. Meant for demonstration purposes only.
const demoRouter = express.Router();

demoRouter.use("/kroger", krogerRouter);

export default demoRouter;
