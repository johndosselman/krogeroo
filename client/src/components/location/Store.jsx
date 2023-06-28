const Store = ({ address, phone, name }) => {
  return (
    <div>
      <h2>{address}</h2>
      <p>{name}</p>
      <p>{phone}</p>
    </div>
  );
};

export default Store;
