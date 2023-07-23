import getUserId from "./getUserId";
import supabase from "./supabaseClient";

const addProduct = async ({ productId }) => {
  const { error } = await supabase.from("product").upsert({ id: productId });
  if (error) throw error;
};

const addUserProduct = async ({ productId, userId }) => {
  const { error } = await supabase
    .from("user_product")
    .upsert({ user_id: userId, product_id: productId });
  if (error) throw error;
};

const addItem = async ({ productId, listId }) => {
  try {
    const userId = await getUserId();
    await addProduct({ productId });
    await addUserProduct({ productId, userId });
    const { error } = await supabase
      .from("item")
      .upsert({ product_id: productId, list_id: listId, user_id: userId });
    if (error) {
      throw error;
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
  }
};

export default addItem;
