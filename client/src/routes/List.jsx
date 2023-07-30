import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import getProductsByTerm from "../services/kroger/products/getProductsByTerm";
import SearchProduct from "../components/SearchProduct";
import addItem from "../services/supabase/addItem";
import getListById from "../services/supabase/getListById";
import Item from "../components/Item";
import ItemModal from "../components/ItemModal";

export const loader = async ({ params }) => {
  const { listId } = params;
  const response = await getListById({ listId });

  // TODO: error handling
  if (response.error) {
    throw response.error;
  }
  const { list } = response;
  if (list.items.length > 0) {
    const { error } = await list.getProductsInfo();
    return { list, error };
  }

  return { list };
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
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemModalItem, setItemModalItem] = useState(null);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const handleProductSearchSubmit = async (e) => {
    e.preventDefault();
    const { products, error } = await getProductsByTerm({
      term: searchValue,
      locationId,
    });
    if (error) {
      // Handle error
      console.log("Failed to retrieve product list from search");
    }
    if (products) {
      setSearchProductList(products);
    }
  };

  const handleOpenItemModal = (item) => {
    setItemModalItem(item);
    setItemModalOpen(true);
  };

  const handleCLoseItemModal = () => {
    setItemModalItem(null);
    setItemModalOpen(false);
  };

  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }

  return (
    <>
      {itemModalItem && (
        <ItemModal
          item={itemModalItem}
          open={itemModalOpen}
          closeModal={handleCLoseItemModal}
        />
      )}
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
        itemList.map((item, key) => (
          <Item
            key={key}
            item={item}
            handleShowItemModal={handleOpenItemModal}
          />
        ))
      ) : (
        <h3>No items</h3>
      )}
      {searchProductList &&
        searchProductList.map((product, key) => (
          <SearchProduct key={key} product={product} />
        ))}
    </>
  );
};

export default List;
