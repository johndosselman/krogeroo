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
          backgroundColor: "lightgray",
          width: "100px",
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{
            display: imageUrl ? "block" : "none",
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
