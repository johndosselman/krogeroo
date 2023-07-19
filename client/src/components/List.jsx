import { Form, useLoaderData } from "react-router-dom";
import getList from "../services/supabase/getList";
import getLocationData from "../services/kroger/locations/getLocationData";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";

export const loader = async ({ params }) => {
  const { listId } = params;
  const { list, error } = await getList(listId);
  const { location } = await getLocationData({ locationId: list.location_id });
  return { location, list, error };
};

const List = () => {
  const { location, list, error } = useLoaderData();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      getProductsByTerm(searchValue);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchValue]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }
  if (location && list) {
    return (
      <>
        <h1>{location.name}</h1>
        <Form method={"post"}>
          <input
            type="search"
            name=""
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        </Form>
      </>
    );
  }
};

export default List;
