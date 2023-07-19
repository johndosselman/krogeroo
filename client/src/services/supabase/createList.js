import supabase from "./supabaseClient";
import getUser from "./getUser";
// Function to create a list in supabase
// TODO: Implement better error handling
const createList = async (locationId) => {
  try {
    const userId = await getUser();
    const { data, error } = await supabase
      .from("list")
      .insert({ user_id: userId, location_id: locationId })
      .select();
    const listId = data[0].id;
    return { listId, error };
  } catch (error) {
    return { error };
  }
};

export default createList;
