import { Outlet } from "react-router-dom";

const NewList = () => {
  return (
    <>
      <h1>Create a list</h1>
      <Outlet />
    </>
  );
};

export default NewList;
