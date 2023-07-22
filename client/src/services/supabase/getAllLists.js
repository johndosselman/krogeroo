import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const getAllLists = async () => {
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .select("*, location(*)")
      .eq("user_id", userId);
    return { lists: data, error };
  } catch (error) {
    return { lists: null, error };
  }
};

export default getAllLists;
