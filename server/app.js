import express from "express";
import v1Router from "./routers/v1Router.js";
import demoRouter from "./routers/demoRouter.js";
import errorHandlingMiddleware from "./middleware/error-handling/errorHandlingMiddleware.js";

const app = express();
const port = 3000;

// Handle main requests requiring client authentication
app.use("/v1", v1Router);
// Handle demonstration requests
app.use("/demo", demoRouter);
// Handle errors
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
