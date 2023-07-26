import { useState } from "react";
import useGetImage from "../hooks/useGetImage";

const Item = ({ item, handleShowItemModal }) => {
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
    <div
      style={{
        borderRadius: "1rem",
        border: "1pt solid gray",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      {url ? <img src={url} alt={name} /> : <p>Product image unavailable</p>}
      <p>{name}</p>
      <p>{quantity}</p>
      <p>Location: {aisleLocation}</p>
      <p>Sale: ${salePrice}</p>
      <p>Regular: ${regularPrice}</p>
      <button onClick={() => handleShowItemModal(item)}>More</button>
    </div>
  );
};

export default Item;
