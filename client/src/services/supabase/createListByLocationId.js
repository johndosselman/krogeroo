import supabase from "./supabaseClient";
import getUserId from "./getUserId";
// Function to create a list in supabase
// TODO: Implement better error handling
const createListByLocationId = async (locationId) => {
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .insert({ user_id: userId, location_id: locationId })
      .select();
    const listId = data[0].id;
    return { listId, error };
  } catch (error) {
    return { listId: null, error };
  }
};

export default createListByLocationId;
