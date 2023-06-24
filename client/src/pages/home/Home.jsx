import supabase from "../../supabase/supabaseClient";
import { useState } from "react";
import Favorite from "../../components/favorite/Favorite";
import locationsEndpoint from "../../api/endpoints/locationsEndpoint";

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [zipcode, setZipcode] = useState();

  const handleCallLocationsEndpoint = async () => {
    try {
      const res = await locationsEndpoint();
      console.log(res);
    } catch (error) {
      console.log("ERROR");
    }
  };

  const insert = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    const userId = data.user.id;
    const res = await supabase
      .from("favorite")
      .insert([{ content: "someValue", user_id: userId }]);
    console.log(res);
  };

  const getFavorites = async () => {
    const res = await supabase.from("favorite").select("*");
    console.log(res);
    setFavorites([]);
    res.data.forEach((item) =>
      setFavorites((array) => [...array, item.content])
    );
  };

  const handleZipcodeSubmit = async (event) => {
    event.preventDefault();
    // const response = await getStoresByZipcode(zipcode);
    // console.log(response);
  };

  return (
    <>
      <div>Home</div>
      <button onClick={insert}>Insert</button>
      <button onClick={handleCallLocationsEndpoint}>
        Call Locations Endpoint
      </button>
      <form onSubmit={handleZipcodeSubmit}>
        <input type="number" onChange={(e) => setZipcode(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <button onClick={getFavorites}>Get Favorites</button>
      <h1>Favorites</h1>
      {favorites.map((favorite, index) => (
        <Favorite key={index} content={favorite} />
      ))}
    </>
  );
};

export default Home;
