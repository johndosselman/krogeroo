const StoreLocation = ({
  name,
  addressLine1,
  city,
  state,
  zipCode,
  handleClick,
}) => {
  return (
    <div>
      <button onClick={handleClick} style={{ backgroundColor: "pink" }}>
        <h4>{name}</h4>
        <p>{addressLine1}</p>
        <p>{`${city}, ${state} ${zipCode}`}</p>
      </button>
    </div>
  );
};

export default StoreLocation;
