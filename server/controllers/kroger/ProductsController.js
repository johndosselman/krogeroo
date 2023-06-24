const getHeaders = (token) => ({
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

const getProductQueryParams = (query) => {
  const params = {};
  if (query.term) {
    params;
  }
};

const getProducts = async (req, res, next) => {
  const headers = getHeaders(req.token);
  const params = getProductQueryParams(req.query);
};

export default getProducts;
