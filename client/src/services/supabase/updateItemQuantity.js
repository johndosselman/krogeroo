import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const updateItemQuantity = async (params) => {
  const { productId, listId, itemQuantity } = params;
  try {
    const userId = await getUserId();
    const { error } = await supabase
      .from("item")
      .update({ quantity: itemQuantity > 1 ? itemQuantity : 1 })
      .eq("product_id", productId)
      .eq("list_id", listId);
    if (error) return { error };
  } catch (error) {
    return { error };
  }
};

export default updateItemQuantity;
