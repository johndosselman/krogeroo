import { Outlet } from "react-router-dom";

const NewList = () => {
  return (
    <>
      <h1>New List</h1>
      <Outlet />
    </>
  );
};

export default NewList;
