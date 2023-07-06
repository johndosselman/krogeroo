const Store = ({
  name,
  addressLine1,
  city,
  state,
  zipCode,
  locationId,
  select,
}) => {
  const handleClick = () => {
    select(locationId);
  };
  return (
    <div>
      <button onClick={handleClick} style={{ backgroundColor: "pink" }}>
        <h2>{name}</h2>
        <p>{addressLine1}</p>
        <p>{`${city}, ${state} ${zipCode}`}</p>
      </button>
    </div>
  );
};

export default Store;
