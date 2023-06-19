import { useOutletContext } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { useState } from "react";
import Favorite from "../../components/favorite/Favorite";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  const session = useOutletContext();

  const helloWorld = async () => {
    const { data, error } = await supabase.functions.invoke("hello-world", {
      body: { name: "Functions" },
    });
    console.log(data);
    console.log(error);
  };

  const insert = async () => {
    const res = await supabase
      .from("favorite")
      .insert([{ content: "someValue", user_id: session.user.id }]);
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
      <button onClick={insert}>Insert</button>
      <button onClick={helloWorld}>Hello World</button>
      <button onClick={getFavorites}>Get Favorites</button>
      <h1>Favorites</h1>
      {favorites.map((favorite, index) => (
        <Favorite key={index} content={favorite} />
      ))}
    </>
  );
};

export default Home;
