import express from "express";
import v1Router from "./routers/v1/v1Router.js";
import demoRouter from "./routers/demo/demoRouter.js";
import errorHandlingMiddleware from "./middleware/error-handling/errorHandlingMiddleware.js";
import getImage from "./controllers/image/imageController.js";

const app = express();
const port = 3000;

// Handle main v1 API routing
app.use("/api/v1", v1Router);
// Handle demo API routing
// NOTE: The "/demo" router should not be used for a production environment
app.use("/api/demo", demoRouter);
// Image endpoint
app.get("/api/images/:imageUrl", getImage);
// Handle errors
app.use(errorHandlingMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
