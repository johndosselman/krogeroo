import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";
import getListById from "../services/supabase/getListById";
import removeItem from "../services/supabase/removeItem";
import KrogerooList from "../classes/krogerooList";

export const loader = async ({ params }) => {
  const { listId } = params;
  const response = await getListById({ listId });

  // TODO: error handling
  if (response.error) {
    throw response.error;
  }
  const { list: dbList } = response;
  const { krogerooList, error } = await KrogerooList.createFromDbList({
    dbList,
  });
  return { krogerooList, error };
};

export const action = async ({ params, request }) => {
  switch (request.method) {
    case "DELETE": {
      const formData = await request.formData();
      const productId = formData.get("productId");
      const listId = params.listId;
      const { error } = await removeItem({ productId, listId });
      return { error };
    }
  }
};

const List = () => {
  const { krogerooList, error } = useLoaderData();
  const { listName } = krogerooList;
  const [name, setName] = useState(listName);

  if (error) {
    // TODO: error handling
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <h2>{name}</h2>
      <Outlet />
    </>
  );
};

export default List;
