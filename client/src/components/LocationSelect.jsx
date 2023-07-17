import { useLoaderData } from "react-router-dom";
import { CHAINS, QUERY } from "../constants/constants";
import getLocations from "../services/API/locationsAPI";
import { useState } from "react";
import Store from "./store";

export const loader = ({ params }) => {
  const chain = params.chain;
  return chain;
};

const LocationSelect = () => {
  const chain = useLoaderData();
  if (!(chain in CHAINS)) throw new Error("Invalid chain");
  const [zipcode, setZipcode] = useState("");
  const [locationList, setLocationList] = useState([]);

  const handleSearchByZipcode = async (event) => {
    event.preventDefault();
    const params = {
      [QUERY.ZIPCODE]: zipcode,
    };
    const { locations, error } = await getLocations(params);
    console.log(locations);
    if (locations) setLocationList(locations);
  };

  const handleZipcodeInputChange = (event) => {
    const { value } = event.target;
    // Replace all non-numeric characters and set zipcode
    setZipcode(value.replace(/\D/g, ""));
  };

  const handleSearchByLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        const params = {
          [QUERY.LAT]: lat,
          [QUERY.LON]: lon,
        };
        const { locations, error } = await getLocations(params);
        console.log(locations);
        if (locations) setLocationList(locations);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleStoreSelect = async (locationId) => {
    console.log(locationId);
  };

  return (
    <>
      <div>
        <h2>{chain}</h2>
        <h3>Search for locations by zip code</h3>
        <form onSubmit={handleSearchByZipcode}>
          <input
            type="text"
            value={zipcode}
            onChange={handleZipcodeInputChange}
            maxLength={5}
          />
          <button type="submit">Search by zipcode!</button>
        </form>
        {"geolocation" in navigator && (
          <>
            <h3>Or search by your location</h3>
            <button onClick={handleSearchByLocation}>
              Search by location!
            </button>
          </>
        )}
        {locationList.map((item, key) => {
          console.log(item);
          return (
            <Store
              key={key}
              name={item.name}
              addressLine1={item.address.addressLine1}
              city={item.address.city}
              state={item.address.state}
              zipCode={item.address.zipCode}
              locationId={item.locationId}
              select={handleStoreSelect}
            />
          );
        })}
      </div>
    </>
  );
};

export default LocationSelect;
