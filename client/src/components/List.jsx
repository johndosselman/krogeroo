import { useLoaderData } from "react-router-dom";
import getListDataById from "../services/supabase/getListDataById";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";
import SearchProduct from "./SearchProduct";
import updateListName from "../services/supabase/updateListName";

export const loader = async ({ params }) => {
  const { listId } = params;
  const { listData, error } = await getListDataById(listId);
  return { listData, error };
};

const List = () => {
  const { listData, error } = useLoaderData();
  const { name: initialListName, location, id } = listData;

  const [searchValue, setSearchValue] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [listName, setListName] = useState(initialListName);
  const [listNameTimeout, setListNameTimeout] = useState(null);

  const handleChangeListName = async (e) => {
    setListName(e.target.value);

    if (listNameTimeout) {
      clearTimeout(listNameTimeout);
    }
    const timeout = setTimeout(async () => {
      const { error } = await updateListName({
        listId: id,
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

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }
  if (location && typeof listName === "string") {
    return (
      <>
        <input type="text" value={listName} onChange={handleChangeListName} />

        <input
          type="search"
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
