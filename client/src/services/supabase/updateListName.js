import supabase from "./supabaseClient";

const updateListName = async (params) => {
  const { listId, listName } = params;
  const { error } = await supabase
    .from("list")
    .update({ name: listName })
    .eq("id", listId);
  console.log(listName);
  return { error };
};

export default updateListName;
