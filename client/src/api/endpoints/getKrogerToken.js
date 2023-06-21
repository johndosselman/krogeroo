import request from "../request";

const getKrogerToken = async () => {
  const method = "get";
  const url = "/api/kroger/token";
  const response = await request(method, url);
  return response;
};

export default getKrogerToken;
