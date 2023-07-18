import createList from "../services/list/createList";
import { useLoaderData, useNavigate } from "react-router-dom";

const loader = async () => {};

const Lists = () => {
  const lists = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <h1>Lists</h1>
      <button
        onClick={() => {
          navigate(`./new`);
        }}
      >
        +
      </button>
      <ul>{}</ul>
    </>
  );
};

export default Lists;
