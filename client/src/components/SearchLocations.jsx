import { useLoaderData, useNavigate } from "react-router-dom";
import { getLocations } from "../services/API/locationsAPI";
import Location from "./Location";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const { locations, error } = await getLocations(queryParams);
  return { locations, error };
};

const SearchLocations = () => {
  const navigate = useNavigate();
  const { locations, error } = useLoaderData();

  const handleLocationSelect = (locationId) => {
    navigate(`../location/${locationId}`);
  };

  if (error) {
    // TODO: handle error
    return <h1>ERROR</h1>;
  }
  if (locations && locations.length > 0) {
    return locations.map((item, key) => (
      <Location
        key={key}
        name={item.name}
        addressLine1={item.address.addressLine1}
        city={item.address.city}
        state={item.address.state}
        zipCode={item.address.zipCode}
        locationId={item.locationId}
        handleClick={handleLocationSelect}
      />
    ));
  }
  // TODO: handle display no results
  return <h1>NO RESULTS</h1>;
};

export default SearchLocations;
