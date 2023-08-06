import List from "../../classes/dbList";
import supabase from "./supabaseClient";

const getListById = async ({ listId }) => {
  try {
    const { data, error } = await supabase
      .from("list")
      .select(
        "id, name, location(id, address, chain), item(quantity, product(id, user_product(last_added, is_favorite)))"
      )
      .eq("id", listId)
      .limit(1)
      .single();
    const list = new List(data);
    return { list, error };
  } catch (error) {
    return { list: null, error };
  }
};
export default getListById;
