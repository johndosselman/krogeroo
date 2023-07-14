import {
  SupabaseAuthError,
  KrogerAuthError,
  RequestError,
  InternalServerError,
} from "../../shared/errors.js";

// Error-handling middleware
// NOTE: Error-handling middleware in Express accepts four arguments, the additional first argument being the error
const errorHandlingMiddleware = (err, req, res, next) => {
  // If an error occurs
  if (err) {
    // If the error is not a specified error
    if (
      !(
        err instanceof SupabaseAuthError ||
        err instanceof KrogerAuthError ||
        err instanceof RequestError
      )
    ) {
      // Set the error to generic InternalServerError
      err = new InternalServerError();
    }
    // Send a response with the error status and error details
    res.status(err.status).send({ error: err.name, message: err.message });
  }
  next();
};

export default errorHandlingMiddleware;
