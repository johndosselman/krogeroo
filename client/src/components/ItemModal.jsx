import { useState } from "react";
import useGetImage from "../hooks/useGetImage";

const ItemModal = ({ item, open }) => {
  const {
    productId,
    isFavorite,
    quantity,
    name,
    aisleLocation,
    brand,
    categories,
    imageUrl,
    isCurbside,
    isDelivery,
    isInStore,
    isShipToHome,
    regularPrice,
    salePrice,
    size,
  } = item;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { url, error } = useGetImage(imageUrl);
  return (
    <dialog
      open={open}
      style={{
        position: "fixed",
        borderRadius: "1rem",
        border: "1pt solid gray",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      {url ? <img src={url} alt={name} /> : <p>Product image unavailable</p>}
      <p>{name}</p>
      <div style={{ display: "flex" }}>
        <button onClick={() => setItemQuantity(itemQuantity - 1)}>-</button>

        <p style={{ padding: "0 1rem" }}>{itemQuantity}</p>
        <button onClick={() => setItemQuantity(itemQuantity + 1)}>+</button>
      </div>

      <p>Location: {aisleLocation}</p>
      <p>Sale: ${salePrice}</p>
      <p>Regular: ${regularPrice}</p>
    </dialog>
  );
};

export default ItemModal;
