import { Link, useLoaderData, useNavigate } from "react-router-dom";
import getAllLists from "../services/supabase/getAllLists";

export const loader = async () => {
  const { lists, error } = await getAllLists();
  console.log(lists);
  return { lists, error };
};

const AllLists = () => {
  const { lists, error } = useLoaderData();
  const navigate = useNavigate();
  if (!lists || error) {
    // TODO: Handle error
    throw new Error("failed to retrieve lists");
  }
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
      {lists.size === 0 ? (
        <h2>No lists :\</h2>
      ) : (
        <ul>
          {lists.map((list, key) => (
            <li key={key}>
              <Link to={`../lists/${list.listId}`}>{list.listName}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AllLists;
