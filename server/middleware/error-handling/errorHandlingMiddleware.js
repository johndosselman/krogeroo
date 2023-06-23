// TODO: implement error handling
const errorHandlingMiddleware = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(400).send({ error: "ERROR" });
  }
  next();
};

export default errorHandlingMiddleware;
