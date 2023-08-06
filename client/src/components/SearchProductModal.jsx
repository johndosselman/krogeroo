import { useState } from "react";
import { Form } from "react-router-dom";

const SearchProductModal = ({ item, open, closeModal, removeItem }) => {
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            closeModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </button>

        {itemQuantity > 0 && (
          <Form method="delete">
            <button
              name="productId"
              value={productId}
              type="submit"
              onClick={() => {
                removeItem(productId);
                closeModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
              </svg>
            </button>
          </Form>
        )}
      </div>
      <div style={{ aspectRatio: 1, width: "250px" }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            display: imageUrl ? "block" : "none",
            aspectRatio: 1,
            width: "250px",
          }}
        />
      </div>
      <p>{name}</p>
      {itemQuantity ? (
        <div style={{ display: "flex" }}>
          <button
            disabled={itemQuantity <= 1}
            onClick={() => setItemQuantity(itemQuantity - 1)}
          >
            -
          </button>
          <p style={{ padding: "0 1rem" }}>{itemQuantity}</p>
          <button onClick={() => setItemQuantity(itemQuantity + 1)}>+</button>
        </div>
      ) : (
        <button onClick={() => setItemQuantity(1)}>Add item</button>
      )}

      <p>Location: {aisleLocation}</p>
      <p>Sale: ${salePrice}</p>
      <p>Regular: ${regularPrice}</p>
    </dialog>
  );
};

export default SearchProductModal;
