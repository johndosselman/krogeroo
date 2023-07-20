const SearchProduct = ({ productId, description, imageURL }) => {
  return (
    <>
      <h3>{description}</h3>
      <img src={imageURL} alt="" />
    </>
  );
};

export default SearchProduct;
