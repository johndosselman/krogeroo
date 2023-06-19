import { Link } from "react-router-dom";
import supabase from "../../helper/supabaseClient";

const Navbar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Link to={"/"}>Home</Link>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Navbar;
