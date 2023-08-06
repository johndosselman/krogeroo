import { Link, useLoaderData, useNavigate } from "react-router-dom";
import getAllLists from "../services/supabase/getAllLists";

export const loader = async () => {
  const { dbLists, error } = await getAllLists();
  return { dbLists, error };
};

const AllLists = () => {
  const { dbLists, error } = useLoaderData();
  const navigate = useNavigate();
  if (!dbLists || error) {
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
      {dbLists.size === 0 ? (
        <h2>No lists :\</h2>
      ) : (
        <ul>
          {dbLists.map((dbList, key) => (
            <li key={key}>
              <Link to={`../lists/${dbList.listId}`}>{dbList.listName}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AllLists;
