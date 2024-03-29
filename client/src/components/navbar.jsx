import { Link } from "react-router-dom";
import supabase from "../services/supabase/supabaseClient";

const Navbar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/lists/"}>Lists</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
