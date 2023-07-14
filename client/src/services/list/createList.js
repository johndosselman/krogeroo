import supabase from "../../supabase/supabaseClient";

// Helper function to get supabase user
async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Failed to retrieve supabase user");
  return data.user.id;
}

// Function to create a list in supabase
// TODO: Implement better error handling
const createList = async () => {
  const userId = await getUser();
  const { data, error } = await supabase
    .from("list")
    .insert({ user_id: userId })
    .select();
  if (error) throw new Error("Failed to create new list");
  return data[0];
};

export default createList;
