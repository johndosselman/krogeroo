import supabase from "./supabaseClient";
import { SupabaseAuthError } from "../../../shared/errors";

// Function to retrieve client Supabase token for API request authorization
const getSupabaseToken = async () => {
  // Get supabase session
  const { data, error } = await supabase.auth.getSession();
  // Throw error upon error or null data
  if (!data || error)
    throw new SupabaseAuthError("Failed to retrieve Supabase token");
  // Get token from session
  const token = data.session.access_token;
  return token;
};

export default getSupabaseToken;
