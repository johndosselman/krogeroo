import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const removeItem = async ({ productId, listId }) => {
  try {
    const userId = await getUserId();
    const { error } = await supabase
      .from("item")
      .delete()
      .eq("product_id", productId)
      .eq("list_id", listId);
    return { error };
  } catch (error) {
    return { error };
  }
};

export default removeItem;
