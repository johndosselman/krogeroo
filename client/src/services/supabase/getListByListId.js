import supabase from "./supabaseClient";

const getList = async (listId) => {
  try {
    const { data, error } = await supabase
      .from("list")
      .select()
      .eq("id", listId);
    const list = data[0];
    return { list, error };
  } catch (error) {
    return { list: null, error };
  }
};
export default getList;
