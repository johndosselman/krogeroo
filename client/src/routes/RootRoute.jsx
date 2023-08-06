import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import supabase from "../services/supabase/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";

const Root = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
        });
        return () => subscription.unsubscribe();
      } catch (error) {
        // TODO: error handling
        console.log(error);
      }
    };
    fetchSessionData();
  }, []);
  useEffect(() => {
    if (!session && pathname !== "/") {
      navigate("/");
    }
  }, [session, navigate, pathname]);
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
  }
  return (
    <>
      <Navbar />
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
