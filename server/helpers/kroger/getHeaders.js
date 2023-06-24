const getHeaders = (token) => ({
  accept: "application/json",
  Authorization: `Bearer ${token}`,
});

export default getHeaders;
