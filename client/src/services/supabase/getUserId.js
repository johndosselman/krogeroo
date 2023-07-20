import supabase from "./supabaseClient";

// Helper function to get supabase user
const getUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Failed to retrieve supabase user");
  return data.user.id;
};

export default getUserId;
