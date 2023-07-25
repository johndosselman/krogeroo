import { Form } from "react-router-dom";
import useGetImage from "../hooks/useGetImage";

const SearchProduct = ({ productId, description, imageUrl }) => {
  const { url, error } = useGetImage(imageUrl);
  if (error) throw new Error("Failed to retrieve object url");
  if (url) {
    return (
      <>
        <Form method="post">
          <h3>{description}</h3>
          {/* <img src={url} alt={description} /> */}
          <button type="submit" name="productId" value={productId}>
            Add item
          </button>
        </Form>
      </>
    );
  }
  return <h1>LOADING</h1>;
};

export default SearchProduct;
