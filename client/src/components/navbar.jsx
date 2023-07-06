import { Link } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

const Navbar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <Link to={"/"}>Home</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
