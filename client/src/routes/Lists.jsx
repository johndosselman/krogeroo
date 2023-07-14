import createList from "../services/list/createList";
import { useNavigate } from "react-router-dom";

// export async function loader({request}) {

// }

const Lists = () => {
  const navigate = useNavigate();
  //const { lists } = useLoaderData();
  const handleCreateList = async () => {
    try {
      const list = await createList();
      console.log(list);
      navigate(`/lists/${list.id}/edit`);
    } catch (error) {
      console.log(error);
    }
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
