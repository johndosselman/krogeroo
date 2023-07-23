import supabase from "./supabaseClient";

const getListDataById = async (listId) => {
  try {
    const { data: listData, error } = await supabase
      .from("list")
      .select(
        "id, name, location(id, address, chain), item(quantity, product(id, user_product(last_modified, is_favorite)))"
      )
      .eq("id", listId)
      .limit(1)
      .single();
    console.log(listData);
    return { listData, error };
  } catch (error) {
    return { listData: null, error };
  }
};
export default getListDataById;
