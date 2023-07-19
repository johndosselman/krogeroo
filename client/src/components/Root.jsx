import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../services/supabase/supabaseClient";

const Root = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  // If there is no active session, return the Supabase Auth component
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          extend: false,
          className: {},
        }}
      />
    );
    // Else return the app
  } else {
    return (
      <>
        <Navbar />
        {/* Children */}
        <Outlet />
      </>
    );
  }
};

export default Root;
