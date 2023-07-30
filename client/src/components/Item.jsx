import { Suspense, useEffect, useState } from "react";
import useGetImage from "../hooks/useGetImage";
import getProductImage from "../services/kroger/images/getProductImage";
import feathers from "../assets/feathers-transformed.jpeg";

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

  const [fetchedUrl, setFetchedUrl] = useState(null);

  useEffect(() => {
    return async () => {
      const { url } = await getProductImage({
        imageUrl: encodeURIComponent(imageUrl),
      });
      setFetchedUrl(url);
    };
  }, [imageUrl]);

  return (
    <div
      style={{
        borderRadius: "1rem",
        border: "1pt solid gray",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <div
        style={{
          aspectRatio: 1,
          backgroundColor: "pink",
          width: "100px",
        }}
      >
        <img
          src={fetchedUrl}
          alt={name}
          style={{
            display: fetchedUrl ? "block" : "none",
            aspectRatio: 1,
            width: "100px",
          }}
        />
      </div>

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
