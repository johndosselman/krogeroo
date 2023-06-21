import axios from "axios";
import supabase from "../supabase/supabaseClient";

const request = async (method, url, data) => {
  try {
    // Get the Supabase session
    const auth = await supabase.auth.getSession();
    // Get token from session
    const token = auth.data.session.access_token;
    // Add token to headers
    const headers = { Authorization: `Bearer ${token}` };
    // Make request
    const response = await axios({
      method: method,
      url: url,
      // Optional data for POST requests
      data: data,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
  }
};

export default request;
