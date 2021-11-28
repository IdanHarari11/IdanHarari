import React from "react";
import * as S from "./style";
// import { useLocation } from "react-router";
import Text from "components/Text";
import UserList from "components/UserList";
import { useFavorite } from "context/FavoriteCTX";

const Favorite = () => {
  const myFavorites = useFavorite();
  let favorites = myFavorites.favorites;
  if(JSON.parse(localStorage.getItem('favorites'))){
    favorites = JSON.parse(localStorage.getItem("favorites"));
  }


//   const location = useLocation();
  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold color={"#84ffff"}>
            Favorites
          </Text>
        </S.Header>
      <UserList users={favorites} />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorite;
