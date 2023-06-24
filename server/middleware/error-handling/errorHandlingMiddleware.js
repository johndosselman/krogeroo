import {
  SupabaseAuthError,
  KrogerAuthError,
  RequestError,
  InternalServerError,
} from "../../../shared/errors.js";

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err) {
    if (
      !(
        err instanceof SupabaseAuthError ||
        err instanceof KrogerAuthError ||
        err instanceof RequestError
      )
    ) {
      err = new InternalServerError();
    }
    res.status(err.status).send({ error: err.name, message: err.message });
  }
  next();
};

export default errorHandlingMiddleware;
