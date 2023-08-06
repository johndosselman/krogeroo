import { useEffect, useState } from "react";
import getSearchProducts from "../services/kroger/products/getSearchProducts";
import SearchProduct from "../components/SearchProduct";
import { Form, useLoaderData, useRouteLoaderData } from "react-router-dom";
import addItem from "../services/supabase/addItem";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("query");
  if (!searchTerm) {
    return { products: null };
  }
  const locationId = url.searchParams.get("locationId");
  if (!locationId) {
    // TODO: handle no locationId provided
    throw new Response("error");
  }
  const { searchProducts, error } = await getSearchProducts({
    term: searchTerm,
    locationId,
  });
  return { searchProducts, error };
};

export const action = async ({ request, params }) => {
  switch (request.method) {
    case "POST": {
      const { listId } = params;
      const formData = await request.formData();
      const productId = formData.get("productId");
      return await addItem({ productId, listId });
    }
  }
};

const AddItemRoute = () => {
  const { searchProducts, error } = useLoaderData();
  // TODO: error handling
  const { krogerooList } = useRouteLoaderData(`list`);
  const { locationId, krogerooItems } = krogerooList;
  const [searchProductList, setSearchProductList] = useState([]);

  useEffect(() => {
    setSearchProductList(searchProducts);
  }, [searchProducts]);

  return (
    <>
      <Form replace>
        <input name="query" type="search" />
        <button type="submit" name="locationId" value={locationId}>
          Search
        </button>
      </Form>
      {searchProductList &&
        searchProductList.map((product, key) => {
          const item = krogerooItems.find(
            (item) => item.productId === product.productId
          );
          return <SearchProduct key={key} product={product} item={item} />;
        })}
    </>
  );
};

export default AddItemRoute;
