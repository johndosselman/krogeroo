import { Form } from "react-router-dom";

const SearchProduct = ({ product, item }) => {
  const {
    productId,
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
  } = product;

  return (
    <>
      <Form method="post">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{salePrice}</p>
        <p>{regularPrice}</p>
        <p>{brand}</p>
        <p>{aisleLocation}</p>

        <button type="submit" name="productId" value={productId}>
          {item
            ? "ADDED"
            : isInStore && regularPrice
            ? "Add to list"
            : "not available"}
        </button>
      </Form>
    </>
  );
};

export default SearchProduct;
