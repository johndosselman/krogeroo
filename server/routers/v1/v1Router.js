import express from "express";
import supabaseAuthMiddleware from "../../middleware/supabase/supabaseAuthMiddleware.js";
import krogerRouter from "../kroger/krogerRouter.js";

const v1Router = express.Router();

// Authenticate client
v1Router.use(supabaseAuthMiddleware);

// use Kroger router
v1Router.use("/kroger", krogerRouter);

export default v1Router;
