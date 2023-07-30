import { useEffect, useState } from "react";
import useGetImage from "../hooks/useGetImage";
import getProductImage from "../services/kroger/images/getProductImage";

const ItemModal = ({ item, open, closeModal }) => {
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
  const [fetchedUrl, setFetchedUrl] = useState(null);

  useEffect(() => {
    return async () => {
      setFetchedUrl(null);
      const { url } = await getProductImage({
        imageUrl: encodeURIComponent(imageUrl),
      });
      setFetchedUrl(url);
    };
  }, [imageUrl]);

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
      <div>
        <button
          onClick={() => {
            closeModal();
          }}
        >
          x
        </button>
      </div>
      <div style={{ aspectRatio: 1, width: "250px" }}>
        <img
          src={fetchedUrl}
          alt={name}
          style={{
            display: fetchedUrl ? "block" : "none",
            aspectRatio: 1,
            width: "250px",
          }}
        />
      </div>
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
