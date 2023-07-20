import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const getAllLists = async () => {
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .select("id")
      .eq("user_id", userId);
    return { data, error };
  } catch (error) {
    return { error };
  }
};

export default getAllLists;
