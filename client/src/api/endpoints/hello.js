import request from "../request";

const getHello = async () => {
  const method = "GET";
  const url = "/api/v1/kroger/locations";

  const response = await request(method, url);
  return response;
};

export default getHello;
