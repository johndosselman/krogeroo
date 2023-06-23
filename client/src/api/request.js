import axios from "axios";
import supabase from "../supabase/supabaseClient";

const request = async (method, url) => {
  try {
    // Add Supabase session token to headers
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;
    const headers = { Authorization: `Bearer ${token}` };

    // Make request
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default request;
