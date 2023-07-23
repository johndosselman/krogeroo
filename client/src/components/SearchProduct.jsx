import useGetImage from "../hooks/useGetImage";

const SearchProduct = ({ productId, description, imageUrl, handleClick }) => {
  const { url, error } = useGetImage(imageUrl);
  if (error) throw new Error("Failed to retrieve object url");
  if (url) {
    return (
      <>
        <h3>{description}</h3>
        <img src={url} alt={description} />
        <button onClick={() => handleClick({ productId })}>Add</button>
      </>
    );
  }
  return <h1>LOADING</h1>;
};

export default SearchProduct;
