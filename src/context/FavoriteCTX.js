import { findFromFavorites } from "helpers/findArr";
import { getItemFromLocalStorage, setItemToLocalStorage } from "helpers/localStorage";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosHeart, IoMdHeartDislike } from "react-icons/io";
 
toast.configure();

const Favorites = createContext({
  addFavoriteHandler: () => {},
  deleteFavoriteHandler: () => {},
});

export const useFavorite = () => useContext(Favorites);

const FavoritesProvider = (props) => {
  const [favorites, setFavorites] = useState(
    getItemFromLocalStorage("favorites") || []
  );

  useEffect(() => {
    if (getItemFromLocalStorage("favorites")) {
      setFavorites(getItemFromLocalStorage("favorites"));
    }
  }, []);

  useEffect(() => {
    setItemToLocalStorage("favorites", favorites);
  }, [favorites]);

  const addFavoriteHandler = (person) => {
    const exist = findFromFavorites(favorites, person);
    if (exist) {
      deleteFavoriteHandler(person);
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, person]);
      toast.success(`${person.name.first} ${person.name.last} Added To Favorite !`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        icon: IoIosHeart
      });
    }
  };

  const deleteFavoriteHandler = (person) => {
    const exist = findFromFavorites(favorites, person);
    if (exist) {
      setFavorites(
        favorites.filter((favorite) => favorite.login.uuid !== exist.login.uuid)
      );
      setItemToLocalStorage("favorites", favorites);
    }
    toast.error(`${person.name.first} ${person.name.last} Removed From Favorite !`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      icon: IoMdHeartDislike
    });
  };

  return (
    <Favorites.Provider
      value={{
        favorites,
        addFavoriteHandler,
        deleteFavoriteHandler,
      }}
    >
      {props.children}
    </Favorites.Provider>
  );
};

export default FavoritesProvider;
