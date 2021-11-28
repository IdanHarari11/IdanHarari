import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { CallOutlined, EmailOutlined } from "@material-ui/icons";
import * as S from "./style";
import { useLocation } from "react-router";
import { useFavorite } from "context/FavoriteCTX";
import { countriesArr } from '../../helpers/countriesArr'

const UserList = ({ fetchUsers, users, isLoading }) => {
  // States
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countries, setCountries] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [flag, setFlag] = useState(false);
  const [path, setPath] = useState("home");

  // Context
  const { addFavoriteHandler, favorites } = useFavorite();

  // routing
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") {
      setPath("home");
    }
    if (location.pathname == "/favorite") {
      setPath("favorite");
    }
  }, [location]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleFavorite = (user) => {
    addFavoriteHandler(user);
  };

  // Countries filters
  const handleCountries = (nat) => {
    // index = -1 if isn't exist in the countries array
    let index = countries.indexOf(nat);

    // if the country is exist -> delete it from the array | else -> add it to the array
    index != -1
      ? setCountries(countries.filter((country) => country !== nat))
      : setCountries((prevCountries) => [...prevCountries, nat]);
  };

  // Infinity scroll
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      !countries.length &&
      path == "home"
    ) {
      setFlag(true);
      setPageNum(pageNum + 1);
    }
  };

  // useEffect for fetching when the user scroll down 
  useEffect(() => {
    if (flag) {
      fetchUsers(pageNum);
    }
    return () => {
      setFlag(false);
    };
  }, [pageNum]);


const listToMap = path == "home" ? users : favorites;
const filteredList = listToMap.filter((user) => countries.length ? countries.includes(user.nat) : user);
  return (
    <S.UserList>
      <S.Filters>
        {countriesArr.map((country) => (
          <CheckBox
            onChange={handleCountries}
            key={country.value}
            value={country.value}
            label={country.label}
          />
        ))}
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {filteredList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={true}>
                {favorites.find((favorite) => favorite.login.uuid == user.login.uuid) && (
                  <IconButton onClick={() => handleFavorite(user)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                )}
                <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                  {!favorites.find(
                    (favorite) => favorite.login.uuid == user.login.uuid
                  ) && (
                    <IconButton onClick={() => handleFavorite(user)}>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  )}
                  <IconButton>
                    <a href={"tel:" + user.phone} style={{ color: "green" }}>
                      <CallOutlined />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a href={"mailto:" + user.email} style={{ color: "#0d47a1" }}>
                      <EmailOutlined />
                    </a>
                  </IconButton>
                </S.IconButtonWrapper>
              </S.IconButtonWrapper>
            </S.User>
          );
          // }
        })}
        {listToMap.length === 0 && (
          <S.ValidateText size="22px" bold>
            No users to show
          </S.ValidateText>
        )}
        {filteredList.length === 0 &&
          listToMap.length > 0 && (
            <S.ValidateText size="22px" bold>
              No users in this country
            </S.ValidateText>
          )}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default React.memo(UserList);
