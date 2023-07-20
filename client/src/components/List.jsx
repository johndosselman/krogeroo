import { useLoaderData } from "react-router-dom";
import getListByListId from "../services/supabase/getListByListId";
import getLocationData from "../services/kroger/locations/getLocationData";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";
import SearchProduct from "./SearchProduct";

export const loader = async ({ params }) => {
  const { listId } = params;
  const { list, error } = await getListByListId(listId);
  const { location } = await getLocationData({
    locationId: list.location_id,
  });
  return { location, list, error };
};

const List = () => {
  const { location, list, error } = useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  useEffect(() => {
    const delay = setTimeout(async () => {
      const { products, error } = await getProductsByTerm({
        term: searchValue,
        locationId: location.locationId,
      });
      //TODO: error handling
      if (error) console.log(error);
      if (products) {
        console.log(products);
        setSearchProducts(products);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchValue, location.locationId]);

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

        <input
          type="search"
          name=""
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        {searchProducts &&
          searchProducts.map((item, key) => (
            <SearchProduct
              key={key}
              productId={item.productId}
              description={item.description}
              imageURL={
                item.images.find((image) => image.featured).sizes[0].url
              }
              onSelect={{}}
            />
          ))}
      </>
    );
  }
};

export default List;
