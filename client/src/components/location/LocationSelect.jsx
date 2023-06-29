import { useState } from "react";
import getLocations from "../../services/locations/locationsAPI";
import sharedConstants from "../../../../shared/sharedConstants";
import Store from "./store";

const LocationSelect = () => {
  const [zipcode, setZipcode] = useState("");
  const [locationList, setLocationList] = useState([]);

  const handleSearchByZipcode = async (event) => {
    event.preventDefault();
    const params = {
      [sharedConstants.QUERY.ZIPCODE]: zipcode,
      [sharedConstants.QUERY.RADIUS]: 1,
    };
    const locations = await getLocations(params);
    console.log(locations);
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
          [sharedConstants.QUERY.LAT]: lat,
          [sharedConstants.QUERY.LON]: lon,
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
      <h1>Search for locations by zip code</h1>
      <form onSubmit={handleSearchByZipcode}>
        <input
          type="text"
          value={zipcode}
          onChange={handleZipcodeInputChange}
          maxLength={5}
        />
        <button type="submit">Search by zipcode!</button>
      </form>
      {"geolocation" in navigator ? (
        <>
          <h1>Or search by your location</h1>
          <button onClick={handleSearchByLocation}>Search by location!</button>
        </>
      ) : (
        <></>
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
    </>
  );
};

export default LocationSelect;
