import getUser from "./getUser";
import supabase from "./supabaseClient";

const getAllLists = async () => {
  try {
    const userId = await getUser();
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
