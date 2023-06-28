import supabase from "../../supabase/supabaseClient";
import { useState } from "react";
import Favorite from "../../components/favorite/Favorite";
import LocationSelect from "../../components/location/LocationSelect";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <>
      <div>Home</div>
      <LocationSelect />
      <button onClick={insert}>Insert</button>
      <button onClick={getFavorites}>Get Favorites</button>
      <h1>Favorites</h1>
      {favorites.map((favorite, index) => (
        <Favorite key={index} content={favorite} />
      ))}
    </>
  );
};

export default Home;
