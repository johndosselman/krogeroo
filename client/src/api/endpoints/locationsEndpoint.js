import request from "../request";

const locationsEndpoint = async () => {
  const method = "GET";
  const url = "/api/v1/kroger/locations?limit=200&chain=kroger";

  const response = await request(method, url);
  return response;
};

export default locationsEndpoint;
