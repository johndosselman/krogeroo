// Function to get headers for Kroger locations endpoint request
const getKrogerHeaders = (token) => ({
  Accept: "application/json",
  // Use bearer authentication with provided token
  Authorization: `Bearer ${token}`,
});

export default getKrogerHeaders;
