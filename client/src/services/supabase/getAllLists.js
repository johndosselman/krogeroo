import List from "../../models/listModel";
import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const getAllLists = async () => {
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .select(
        "id, name, location(id, address, chain), item(quantity, product(id, user_product(last_modified, is_favorite)))"
      )
      .eq("user_id", userId);
    const lists = data.map((listData) => new List(listData));
    return { lists, error };
  } catch (error) {
    return { lists: null, error };
  }
};

export default getAllLists;
