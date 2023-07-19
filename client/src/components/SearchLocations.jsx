import {
  Form,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getLocations } from "../services/kroger/locations/getLocations";
import StoreLocation from "./StoreLocation";
import { useState } from "react";
import { CHAINS, QUERY } from "../constants/constants";
import createList from "../services/supabase/createList";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const urlSearchParams = url.searchParams;
  if (urlSearchParams.size === 0) {
    return { locations: null, error: null };
  }
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  const { locations, error } = await getLocations(queryParams);
  return { locations, error };
};

const SearchLocations = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { locations, error } = useLoaderData();
  const [zipCode, setZipCode] = useState("");
  const [chainValue, setChainValue] = useState(CHAINS.KROGER);

  const handleZipcodeInputChange = (event) => {
    const { value } = event.target;
    setZipCode(value.replace(/\D/g, ""));
  };

  const handleSearchByLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const latLong = `${lat},${long}`;
        const params = new URLSearchParams({
          [QUERY.LATLONG]: latLong,
          [QUERY.CHAIN]: chainValue,
        });
        setSearchParams(params);
      },
      (error) => {
        // TODO: handle error
        console.log(error);
      }
    );
  };

  const handleLocationSelect = async (locationId) => {
    const { listId, error } = await createList(locationId);
    // TODO: error handling
    if (error) {
      console.log(error);
    }
    if (listId) {
      navigate(`/list/${listId}`);
    }
  };
  return (
    <>
      {"geolocation" in navigator && (
        <button onClick={handleSearchByLocation}>Search by location!</button>
      )}
      <Form method="get">
        <select
          name={QUERY.CHAIN}
          value={chainValue}
          onChange={(event) => {
            setChainValue(event.target.value);
          }}
        >
          <option value={CHAINS.FRYS}>Fry&apos;s</option>
          <option value={CHAINS.KROGER}>Kroger</option>
          <option value={CHAINS.MARIANOS}>Mariano&apos;s</option>
        </select>
        <input
          type="text"
          aria-label="search locations by zipcode"
          name={QUERY.ZIPCODE}
          value={zipCode}
          onChange={handleZipcodeInputChange}
          required
          minLength={5}
          maxLength={5}
        />
        <button type="submit">Search by zipcode!</button>
      </Form>
      {searchParams.size > 0 &&
        (error ? (
          <h1>ERROR</h1>
        ) : locations && locations.length > 0 ? (
          locations.map((item, key) => (
            <StoreLocation
              key={key}
              name={item.name}
              addressLine1={item.address.addressLine1}
              city={item.address.city}
              state={item.address.state}
              zipCode={item.address.zipCode}
              locationId={item.locationId}
              handleClick={handleLocationSelect}
            />
          ))
        ) : (
          <h1>NO RESULTS</h1>
        ))}
    </>
  );
};

export default SearchLocations;
