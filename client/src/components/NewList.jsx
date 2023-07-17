import { useState } from "react";
import { Outlet } from "react-router-dom";

const NewList = () => {
  const [listName, setListName] = useState("New List");
  const handleInputChange = (e) => {
    const name = e.target.value;
    setListName(name);
  };
  return (
    <>
      <h1>Create a list</h1>
      <input
        type="text"
        name="listNameInput"
        value={listName}
        onChange={handleInputChange}
      />
      <Outlet />
    </>
  );
};

export default NewList;
