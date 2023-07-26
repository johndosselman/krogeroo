import { Form } from "react-router-dom";
import useGetImage from "../hooks/useGetImage";

const SearchProduct = ({ product }) => {
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
  const { url, error } = useGetImage(imageUrl);
  if (error) throw new Error("Failed to retrieve object url");
  if (url) {
    return (
      <>
        <Form method="post">
          <img src={url} alt={name} />
          <h3>{name}</h3>
          <p>{salePrice}</p>
          <p>{regularPrice}</p>
          <p>{brand}</p>
          <p>{aisleLocation}</p>

          <button type="submit" name="productId" value={productId}>
            {isInStore && regularPrice ? "Add to list" : "not available"}
          </button>
        </Form>
      </>
    );
  }
  return <h1>LOADING</h1>;
};

export default SearchProduct;
