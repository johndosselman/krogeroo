import DbList from "../../classes/dbList";
import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const getAllLists = async () => {
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .select(
        "id, name, location(id, address, chain), item(quantity, product(id, user_product(last_added, is_favorite)))"
      )
      .eq("user_id", userId);
    const dbLists = data.map((listData) => new DbList(listData));
    return { dbLists, error };
  } catch (error) {
    return { dbLists: null, error };
  }
};

export default getAllLists;
