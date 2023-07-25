import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";
import SearchProduct from "./SearchProduct";
import addItem from "../services/supabase/addItem";
import getListById from "../services/supabase/getListById";
import getProductsByIds from "../services/kroger/products/getProductsByIds";

export const loader = async ({ params }) => {
  const { listId } = params;
  const response = await getListById({ listId });

  // TODO: error handling
  if (response.error) {
    throw response.error;
  }
  const { list } = response;
  const { error } = await list.getProductsInfo();
  return { list, error };
};

export const action = async ({ request, params }) => {
  const { listId } = params;
  const formData = await request.formData();
  const productId = formData.get("productId");
  return await addItem({ productId, listId });
};

const List = () => {
  const { list, error } = useLoaderData();
  const { listId, listName: name, locationId, address, chain, items } = list;
  const [searchValue, setSearchValue] = useState("");
  const [searchProductList, setSearchProductList] = useState([]);
  const [itemList, setItemList] = useState(items);
  const [listName, setListName] = useState(name);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const handleProductSearchSubmit = async (e) => {
    e.preventDefault();
    const { products, error } = await getProductsByTerm({
      term: searchValue,
      locationId: location.id,
    });
    if (error) {
      // Handle error
      console.log("Failed to retrieve product list from search");
    }
    if (products) {
      setSearchProductList(products);
    }
  };

  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <h2>{listName}</h2>
      <form onSubmit={handleProductSearchSubmit}>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </form>
      {itemList && itemList.length > 0 ? (
        itemList.map((item, key) => <div key={key}>{item.name}</div>)
      ) : (
        <h3>No items</h3>
      )}
      {searchProductList &&
        searchProductList.map((item, key) => (
          <SearchProduct
            key={key}
            productId={item.productId}
            description={item.name}
            imageUrl={item.imageUrl}
          />
        ))}
    </>
  );
};

export default List;
