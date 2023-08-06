import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../components/Item";
import ItemModal from "../components/ItemModal";
import removeItem from "../services/supabase/removeItem";

const ListItems = () => {
  const { krogerooList, error } = useRouteLoaderData(`list`);
  const { krogerooItems } = krogerooList;
  const navigate = useNavigate();

  const [itemList, setItemList] = useState(krogerooItems);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemModalItem, setItemModalItem] = useState(null);

  useEffect(() => {
    setItemList(krogerooItems);
  }, [krogerooItems]);

  const handleOpenItemModal = (item) => {
    setItemModalItem(item);
    setItemModalOpen(true);
  };

  const handleCloseItemModal = () => {
    setItemModalOpen(false);
  };

  const handleRemoveItem = async (productId) => {
    setItemList(itemList.filter((item) => item.productId !== productId));
  };

  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate(`./add-item`);
        }}
      >
        Add item
      </button>
      {itemModalItem && (
        <ItemModal
          item={itemModalItem}
          open={itemModalOpen}
          closeModal={handleCloseItemModal}
          removeItem={handleRemoveItem}
        />
      )}

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
    </>
  );
};

export default ListItems;
