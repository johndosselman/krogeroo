import supabase from "../../supabase/supabaseClient";

// Helper function to get supabase user
async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Failed to retrieve supabase user");
  return data.user.id;
}

// Function to create a list
// TODO: Implement better error handling
async function createList() {
  const userId = await getUser();
  const { error } = await supabase.from("list").insert({ user_id: userId });
  if (error) throw new Error("Failed to create new list");
}

export default createList();
