import request from "../request";

const getStoresByZipcode = async (zipcode) => {
  const method = "POST";
  const url = "/api/stores/zipcode";
  const data = zipcode;
  const response = await request(method, url, data);
  return response;
};

export default getStoresByZipcode;
