import createList from "../services/list/createList";
import { useNavigate } from "react-router-dom";

//export async function loader({ request }) {}

const Lists = () => {
  const navigate = useNavigate();
  //const { lists } = useLoaderData();
  const handleCreateList = async () => {
    navigate(`/lists/new`);
  };
  return (
    <>
      <h1>Lists</h1>
      <button onClick={handleCreateList}>+</button>
      <ul>{}</ul>
    </>
  );
};

export default Lists;
