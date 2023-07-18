import { useLoaderData } from "react-router-dom";
import { getLocation } from "../services/API/locationsAPI";

export const loader = async ({ params }) => {
  const { location, error } = await getLocation(params);
  return { location, error };
};

const NewListByLocation = () => {
  const data = useLoaderData();
  console.log(data);
  //   if (error) {
  //     return <h1>ERROR</h1>;
  //   }
  //   if (location) {
  //     console.log(location);
  //   }
};

export default NewListByLocation;
