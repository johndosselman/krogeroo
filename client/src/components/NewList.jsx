import { useState } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import { CHAINS, QUERY } from "../constants/constants";

const NewList = () => {
  const [listName, setListName] = useState("New List");
  const [zipCode, setZipCode] = useState("");
  const [chain, setChain] = useState(CHAINS.KROGER);

  const navigate = useNavigate();

  const handleNameInputChange = (e) => {
    const name = e.target.value;
    setListName(name);
  };
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
        const searchParams = new URLSearchParams({
          [QUERY.LATLONG]: latLong,
          [QUERY.CHAIN]: chain,
        });
        console.log(`./search?${searchParams.toString()}`);
        navigate(`./search?${searchParams.toString()}`);
      },
      (error) => {
        // TODO: handle error
        console.log(error);
      }
    );
  };

  return (
    <>
      <h1>Create a list</h1>
      <input
        type="text"
        name="listNameInput"
        value={listName}
        onChange={handleNameInputChange}
      />
      {"geolocation" in navigator && (
        <>
          <button onClick={handleSearchByLocation}>Search by location!</button>
        </>
      )}
      <Form
        method="get"
        action="./search"
        value={chain}
        onChange={(e) => {
          setChain(e.target.value);
        }}
      >
        <select name={QUERY.CHAIN}>
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
          maxLength={5}
        />
        <button type="submit">Search by zipcode!</button>
      </Form>

      <Outlet />
    </>
  );
};

export default NewList;
