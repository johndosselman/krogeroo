import { useLoaderData, useNavigate } from "react-router-dom";
import getAllLists from "../services/supabase/getAllLists";

export const loader = async () => {
  const { data, error } = await getAllLists();
  return { data, error };
};

const AllLists = () => {
  const { data, error } = useLoaderData();
  console.log(data);
  console.log(error);
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

export default AllLists;
