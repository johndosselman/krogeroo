import express from "express";
import v1Router from "./routers/v1Router.js";
import demoRouter from "./routers/demoRouter.js";
import errorHandlingMiddleware from "./middleware/error-handling/errorHandlingMiddleware.js";

const app = express();
const port = 3000;

// Handle main request routing
app.use("/v1", v1Router);
// Handle demonstration request routing
app.use("/demo", demoRouter);
// Handle errors
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
