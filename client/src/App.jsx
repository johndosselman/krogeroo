import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "./supabase/supabaseClient";

const App = () => {
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

  if (!session) {
    return (
      // Supabase UI Auth component with custom classes
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          extend: false,
          className: {},
        }}
      />
    );
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

export default App;
