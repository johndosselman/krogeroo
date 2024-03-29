import supabase from "./supabaseClient";
import getUserId from "./getUserId";
// Function to create a list in supabase
// TODO: Implement better error handling

const createLocation = async ({ locationId, address, chain }) => {
  const { error } = await supabase
    .from("location")
    .upsert({ id: locationId, address: address, chain: chain });
  if (error) throw error;
};

const createListByLocation = async ({ locationId, address, chain }) => {
  try {
    await createLocation({ locationId, address, chain });
    // TODO: map chains to formatted chain names
    const name = `${chain.charAt(0).toUpperCase()}${chain
      .slice(1)
      .toLowerCase()} List`;
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("list")
      .insert({
        user_id: userId,
        location_id: locationId,
        name: name,
      })
      .select()
      .limit(1)
      .single();
    const listId = data.id;
    return { listId, error };
  } catch (error) {
    return { listId: null, error };
  }
};

export default createListByLocation;
