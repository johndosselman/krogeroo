import { useLoaderData, useRevalidator } from "react-router-dom";
import getListDataById from "../services/supabase/getListDataById";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";
import SearchProduct from "./SearchProduct";
import updateListName from "../services/supabase/updateListName";
import addItem from "../services/supabase/addItem";

export const loader = async ({ params }) => {
  const { listId } = params;
  const { listData, error } = await getListDataById(listId);
  return { listData, error };
};

const List = () => {
  const { listData, error } = useLoaderData();
  const { id: listId, location, item, name } = listData;
  const revalidator = useRevalidator();
  const [searchValue, setSearchValue] = useState("");
  const [searchProductList, setSearchProductList] = useState([]);
  const [itemList, setItemList] = useState(item);
  const [listName, setListName] = useState(name);
  const [listNameTimeout, setListNameTimeout] = useState(null);

  const handleChangeListName = async (e) => {
    setListName(e.target.value);

    if (listNameTimeout) {
      clearTimeout(listNameTimeout);
    }
    const timeout = setTimeout(async () => {
      const { error } = await updateListName({
        listId: listId,
        listName: e.target.value,
      });
      // handle error
      if (error) console.log("failed to update list name");
    }, 500);

    setListNameTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (listNameTimeout) {
        clearTimeout(listNameTimeout);
      }
    };
  }, [listNameTimeout]);

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

  const handleSelectItem = async ({ productId }) => {
    const params = { productId, listId };
    await addItem(params);
    revalidator.revalidate();
  };

  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }
  if (location && typeof listName === "string") {
    return (
      <>
        <input type="text" value={listName} onChange={handleChangeListName} />
        <form onSubmit={handleProductSearchSubmit}>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </form>
        {itemList &&
          itemList.map((item, key) => <div key={key}>{item.product.id}</div>)}
        {searchProductList &&
          searchProductList.map((item, key) => (
            <SearchProduct
              key={key}
              productId={item.productId}
              description={item.description}
              imageUrl={
                item.images.find((image) => image.featured).sizes[0].url
              }
              handleClick={handleSelectItem}
            />
          ))}
      </>
    );
  }
};

export default List;
